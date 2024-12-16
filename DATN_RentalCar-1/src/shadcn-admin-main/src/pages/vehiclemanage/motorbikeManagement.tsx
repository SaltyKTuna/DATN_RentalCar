import { useToast } from "@/components/ui/use-toast";

const MotorbikeManagement: React.FC = () => {
  const { toast } = useToast();
  // ... other state declarations

  // Update handleImageUpload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (imagePreviews.length + files.length > 5) {
      toast({
        title: "Error",
        description: "Maximum 5 images allowed",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // ... existing upload logic ...
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Update validateMotorbike
  const validateMotorbike = (): boolean => {
    if (!newMotorbike.make.trim()) {
      toast({
        title: "Error",
        description: "Hãng xe không được để trống",
        variant: "destructive",
      });
      return false;
    }
    if (!newMotorbike.model.trim()) {
      toast({
        title: "Error",
        description: "Mẫu xe không được để trống",
        variant: "destructive",
      });
      return false;
    }
    if (!newMotorbike.gearBox) {
      toast({
        title: "Error",
        description: "Vui lòng chọn loại hộp số",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Update handleAddMotorbike
  const handleAddMotorbike = async () => {
    if (!validateMotorbike()) return;

    const motorbikeDataToSend = {
      ...newMotorbike,
      imageUrl: uploadedImages.join(",")
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/motorbikes/${newMotorbike.motorbikeId}`, motorbikeDataToSend);
        
        if (newMotorbike.status === "Bảo dưỡng") {
          await addMaintenance(newMotorbike);
        } else {
          await deleteMaintenanceByMotorbikeId(newMotorbike.motorbikeId);
        }
        
        toast({
          title: "Success",
          description: "Motorbike updated successfully",
        });
      } else {
        await axios.post("http://localhost:8080/api/motorbikes", motorbikeDataToSend);
        
        if (newMotorbike.status === "Bảo dưỡng") {
          await addMaintenance(newMotorbike);
        }
        
        toast({
          title: "Success",
          description: "Motorbike added successfully",
        });
      }
      
      fetchMotorbikes();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: isEditing ? "Failed to update motorbike" : "Failed to add motorbike",
        variant: "destructive",
      });
    }
  };

  // Update handleDelete
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa xe này?")) {
      try {
        const motorbikeToDelete = motorbikes.find(motorbike => motorbike.motorbikeId === id);

        if (motorbikeToDelete) {
          motorbikeToDelete.imageUrl.split(',').forEach(url => {
            const index = imagePreviews.findIndex(preview => preview.includes(url));
            if (index > -1) {
              URL.revokeObjectURL(imagePreviews[index]);
            }
          });
        }

        await axios.delete(`http://localhost:8080/api/motorbikes/${id}`);
        toast({
          title: "Success",
          description: "Motorbike deleted successfully",
        });
        fetchMotorbikes();
        resetForm();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete motorbike",
          variant: "destructive",
        });
      }
    }
  };

  // Update addMaintenance
  const addMaintenance = async (motorbike: Motorbike) => {
    const maintenanceData = {
      maintenanceDate: new Date().toISOString(),
      description: `Bảo dưỡng cho xe ${motorbike.make} ${motorbike.model} (${motorbike.year})`,
      cost: 0,
      motorbikeId: motorbike.motorbikeId,
    };

    try {
      await axios.post("http://localhost:8080/api/car-maintenance", maintenanceData);
      toast({
        title: "Success",
        description: "Maintenance record added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add maintenance record",
        variant: "destructive",
      });
    }
  };

  // Update deleteMaintenanceByMotorbikeId
  const deleteMaintenanceByMotorbikeId = async (motorbikeId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/car-maintenance/${motorbikeId}`);
      toast({
        title: "Success",
        description: "Maintenance record deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete maintenance record",
        variant: "destructive",
      });
    }
  };

  // ... rest of the component remains the same
}; 