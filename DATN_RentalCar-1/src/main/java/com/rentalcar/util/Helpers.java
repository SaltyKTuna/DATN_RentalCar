package com.rentalcar.util;

import java.util.Random;

public class Helpers {
	public static String handleRandom(int size) {
		Random random = new Random();
		StringBuilder randomNumber = new StringBuilder(5);
		for (int i = 0; i < size; i++) {
			int digit = random.nextInt(10);
			randomNumber.append(digit);
		}
		return randomNumber.toString();
	}
}
