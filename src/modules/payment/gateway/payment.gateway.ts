import Transation from "../domain/transaction";

export default interface PaymentGateway {
  save(input: Transation): Promise<Transation>;
}