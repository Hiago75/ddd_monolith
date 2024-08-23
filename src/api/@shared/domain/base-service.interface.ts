export default interface BaseServiceInteface<I, R> {
  execute(input: I): Promise<R>;
}