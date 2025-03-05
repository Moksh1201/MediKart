const express = require("express");
const { getDoctors, addDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctorController");

router.get("/", getDoctors);
router.post("/", addDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;


