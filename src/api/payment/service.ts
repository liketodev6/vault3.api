import PAYMENT_CREDIENTALS, { IPaymentCredientals } from "../../constants/paymentCredientals";
import { getResponse, IResponseModel } from "../mainModels";


class PaymentServices {

  public getCredientals = async (): Promise<IResponseModel<IPaymentCredientals[]>> => {
    return getResponse(true, 'Credientals list', PAYMENT_CREDIENTALS);
  };

};

export default new PaymentServices();