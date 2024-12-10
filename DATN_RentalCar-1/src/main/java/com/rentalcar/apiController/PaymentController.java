package com.rentalcar.apiController;

import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rentalcar.util.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.xml.bind.DatatypeConverter;

import com.rentalcar.dao.PaymentRepo;
import com.rentalcar.entity.Account;
import com.rentalcar.entity.Discount;
import com.rentalcar.entity.Feedback;
import com.rentalcar.entity.Payment;
import com.rentalcar.entity.RentalVehicle;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TimeZone;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

	@Autowired
	private PaymentRepo paymentRepo;

	private Mac HmacSHA256;

	public PaymentController() throws Exception {
		HmacSHA256 = Mac.getInstance("HmacSHA256");
		HmacSHA256.init(new SecretKeySpec(stage_zalo_config.get("key2").getBytes(), "HmacSHA256"));
	}

	public static Map<String, String> getVNPayConfig() {
		Map<String, String> vnpParamsMap = new HashMap<>();
		vnpParamsMap.put("vnp_Version", "2.1.0");
		vnpParamsMap.put("vnp_Command", "pay");
		vnpParamsMap.put("vnp_TmnCode", "58X4B4HP");
		vnpParamsMap.put("vnp_CurrCode", "VND");
		vnpParamsMap.put("vnp_OrderInfo", "nội dung kkk");
		vnpParamsMap.put("vnp_OrderType", "other");
		vnpParamsMap.put("vnp_Locale", "vn");
		vnpParamsMap.put("vnp_ReturnUrl", "http://localhost:8080/api/payment/vn-pay/callback");
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String vnpCreateDate = formatter.format(calendar.getTime());
		vnpParamsMap.put("vnp_CreateDate", vnpCreateDate);
		calendar.add(Calendar.MINUTE, 15);
		String vnp_ExpireDate = formatter.format(calendar.getTime());
		vnpParamsMap.put("vnp_ExpireDate", vnp_ExpireDate);
		return vnpParamsMap;
	}

	public String createVnPayUrl(int d, HttpServletRequest request, String trans_id) {
		Map<String, String> vnpParamsMap = getVNPayConfig();
		long amount = d * 100L;
		vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
		vnpParamsMap.put("vnp_TxnRef", trans_id);
		vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
		String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
		String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
		String vnpSecureHash = VNPayUtil.hmacSHA512("VRLDWNVWDNPCOEPBZUTWSEDQAGXJCNGZ", hashData);
		queryUrl += "&vnp_SecureHash=" + vnpSecureHash;

		String paymentUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html" + "?" + queryUrl;
		return paymentUrl;
	}

	private static Map<String, String> stage_zalo_config = new HashMap<String, String>() {
		{
			put("app_id", "2553");
			put("key1", "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL");
			put("key2", "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz");
			put("endpoint", "https://sb-openapi.zalopay.vn/v2/create");
		}
	};

	public static String getCurrentTimeString(String format) {
		Calendar cal = new GregorianCalendar(TimeZone.getTimeZone("GMT+7"));
		SimpleDateFormat fmt = new SimpleDateFormat(format);
		fmt.setCalendar(cal);
		return fmt.format(cal.getTimeInMillis());
	}

	static String createUrlPaymentZaloPay(double totalAmount, String idQrCode, String app_trans_id) throws IOException {

		Map<String, Object>[] item = new Map[] { new HashMap<>() {
			{
				put("itemid", "item001");
				put("itemname", "Product A");
				put("itemprice", totalAmount);
				put("itemquantity", 1);
			}
		} };

		Map<String, Object> embed_data = new HashMap<>();
		embed_data.put("merchantinfo", "Test Merchant");
		embed_data.put("redirecturl", "http://localhost:8080/success");

		Map<String, Object> order = new HashMap<String, Object>() {
			{
				put("app_id", stage_zalo_config.get("app_id"));
				put("app_time", System.currentTimeMillis());
				put("app_trans_id", app_trans_id);
				put("app_user", "datn");
				put("amount", (int) totalAmount);
				put("description", (String) idQrCode);
				put("bank_code", "");
				put("item", new JSONArray(Arrays.asList(item)).toString());
				put("embed_data", new JSONObject(embed_data).toString());
				put("callback_url",
						"https://09b3-2a09-bac5-d5cd-16d2-00-246-d2.ngrok-free.app/api/payment/zalo-pay/callback");
			}
		};

		String data = order.get("app_id") + "|" + order.get("app_trans_id") + "|" + order.get("app_user") + "|"
				+ order.get("amount") + "|" + order.get("app_time") + "|" + order.get("embed_data") + "|"
				+ order.get("item");
		String mac = HMACUtil.HMacHexStringEncode(HMACUtil.HMACSHA256, stage_zalo_config.get("key1"), data);
		order.put("mac", mac);

		CloseableHttpClient client = HttpClients.createDefault();
		HttpPost post = new HttpPost(stage_zalo_config.get("endpoint"));

		List<NameValuePair> params = new ArrayList<>();
		for (Map.Entry<String, Object> e : order.entrySet()) {
			params.add(new BasicNameValuePair(e.getKey(), e.getValue().toString()));
		}

		post.setEntity(new UrlEncodedFormEntity(params));

		CloseableHttpResponse res = client.execute(post);

		BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
		StringBuilder resultJsonStr = new StringBuilder();
		String line;
		while ((line = rd.readLine()) != null) {
			resultJsonStr.append(line);
		}

		JSONObject result = new JSONObject(resultJsonStr.toString());

		if (result.has("order_url"))
			return result.getString("order_url");

		return null;
	}

	// Tìm tất cả
	@GetMapping
	public ResponseEntity<List<Payment>> getAll() {
		List<Payment> payments = paymentRepo.findAll();
		if (payments.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(payments);
	}

	// Tìm theo ID
	@GetMapping(value = "/{id}")
	public ResponseEntity<Payment> getById(@PathVariable("id") Long id) {
		Optional<Payment> payment = paymentRepo.findById(id);
		if (payment.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(payment.get());
	}

	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public class PaymentResponse {
		private String message;
		private String status;

	}

	@PostMapping
	public ResponseEntity<PaymentResponse> save(@RequestBody Payment payment, HttpServletRequest request) {
		try {

			String trans_id = getCurrentTimeString("yyMMdd") + "_" + Integer.parseInt(Helpers.handleRandom(7));

			payment.setTransId(trans_id);

			if ("COD".equals(payment.getPaymentType()) || "prePayment".equals(payment.getPaymentMethod())) {
				payment.setStatus("pending");

				Payment savedPayment = paymentRepo.save(payment);
				return ResponseEntity.status(HttpStatus.CREATED)
						.body(new PaymentResponse("Save payment successfully...", "success"));
			}

			payment.setStatus("unpaid");
			Payment savedPayment = paymentRepo.save(payment);
			
			String url = "";
			if ("ZaloPay".equals(payment.getPaymentType()))
				url = createUrlPaymentZaloPay(payment.getAmount().doubleValue(), payment.getIdQrCode().toString(),
						trans_id);

			if ("VNPay".equals(payment.getPaymentType()))
				url = createVnPayUrl((int) payment.getAmount().doubleValue(), request, trans_id);
			
			return ResponseEntity.status(HttpStatus.CREATED).body(new PaymentResponse(url, "success"));

		} catch (Exception e) {
			PaymentResponse response = new PaymentResponse("An error occurred while saving payment.", "error");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	
	@GetMapping("/vn-pay/callback")
	public void callbackVNPay(@RequestParam Map<String, String> params, HttpServletResponse response)
			throws IOException {
		String txnRef = params.get("vnp_TxnRef");
		String paymentStatus = params.get("vnp_TransactionStatus");

		if ("00".equals(paymentStatus)) {
			
			Optional<Payment> paymentFound = paymentRepo.findByTransId(txnRef);
			paymentFound.ifPresent(payment -> {
				payment.setStatus("success");
				paymentRepo.save(payment);
			});
		} 

		String redirectUrl = "http://localhost:8080/success?apptransid=" + txnRef;
		response.sendRedirect(redirectUrl);
	}
	
	@PostMapping("/zalo-pay/callback")
	public String save(@RequestBody String dataCallback) {
		JSONObject result = new JSONObject();
		try {
			JSONObject cbdata = new JSONObject(dataCallback);
			String dataStr = cbdata.getString("data");
			String reqMac = cbdata.getString("mac");
			System.out.println("mac : " + reqMac);

			byte[] hashBytes = HmacSHA256.doFinal(dataStr.getBytes());
			String mac = DatatypeConverter.printHexBinary(hashBytes).toLowerCase();

			if (!reqMac.equals(mac)) {
				result.put("return_code", -1);
				result.put("return_message", "mac not equal");
			} else {
				System.out.println(" đúng địa chỉ mac ...");

				JSONObject data = new JSONObject(dataStr);
				System.out.println(data.getString("app_trans_id"));
				Optional<Payment> paymentFound = paymentRepo.findByTransId(data.getString("app_trans_id"));
				paymentFound.ifPresent(payment -> {
					payment.setStatus("success");
					paymentRepo.save(payment);
				});

				result.put("return_code", 1);
				result.put("return_message", "success");

			}
		} catch (Exception ex) {
			System.out.println("" + ex.toString());
			result.put("return_code", 0);
			result.put("return_message", ex.getMessage());
		}

		return result.toString();

	}

	// Cập nhật
	@PutMapping(value = "/{id}")
	public ResponseEntity<String> update(@PathVariable("id") Long id, @RequestBody Payment paymentDetail) {
		Optional<Payment> existingPayment = paymentRepo.findById(id);
		if (existingPayment.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
		}

		Payment paymentUpdate = existingPayment.get();
		paymentUpdate.setAmount(paymentDetail.getAmount());
		paymentUpdate.setRental(paymentDetail.getRental());
		paymentUpdate.setPaymentDate(paymentDetail.getPaymentDate());
		paymentUpdate.setPaymentMethod(paymentDetail.getPaymentMethod());
		paymentUpdate.setNotes(paymentDetail.getNotes());
		paymentUpdate.setIdQrCode(paymentDetail.getIdQrCode());

		paymentRepo.save(paymentUpdate);
		return ResponseEntity.ok("Payment updated successfully");
	}

	// Xóa
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<String> deleteById(@PathVariable("id") Long id) {
		if (!paymentRepo.existsById(id)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found");
		}
		paymentRepo.deleteById(id);
		return ResponseEntity.ok("Payment deleted successfully");
	}
}
