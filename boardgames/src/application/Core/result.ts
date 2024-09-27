export class Result<T> {
  isSuccess: boolean; // Informuje o powodzeniu operacji
  value?: T; // Przechowuje wartość wynikową w przypadku sukcesu
  error?: string; // Przechowuje komunikat o błędzie w przypadku niepowodzenia

  // Metoda statyczna zwracająca wynik operacji z sukcesem i wartością wynikową
  public static success<T>(value: T): Result<T> {
    const result = new Result<T>();
    result.isSuccess = true;
    result.value = value;
    return result;
  }

  // Metoda statyczna zwracająca wynik operacji z błędem
  public static failure<T>(error: string): Result<T> {
    const result = new Result<T>();
    result.isSuccess = false;
    result.error = error;
    return result;
  }
}