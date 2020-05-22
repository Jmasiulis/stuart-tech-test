import { Router } from 'express';
import { 
  getCourierList,
  getAvailableCouriers,
  insertCourier,
  updateCourier,
  deleteCourier
} from '../controllers/CourierController';

const router = Router();

router.get("/", getCourierList);
router.get("/lookup/", getAvailableCouriers);
router.post("/", insertCourier);
router.put("/:id", updateCourier);
router.delete("/:id", deleteCourier);

export default router;