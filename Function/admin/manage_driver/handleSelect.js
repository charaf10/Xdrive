const handleSelect = (driver, selectedDriverId, setSelectedDriverId, setSelectedDriver, openUpdateDeleteModal, setModalUpdateDelete) => {
    const newSelectedDriverId = driver.DriverId === selectedDriverId ? null : driver.DriverId;
    setSelectedDriverId(newSelectedDriverId);
    setSelectedDriver(driver.DriverId);
  
    if (newSelectedDriverId) {
      openUpdateDeleteModal();
    } else {
      setModalUpdateDelete(false);
    }
  };
  
  export default handleSelect;
  