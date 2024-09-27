namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; } // Informuje o powodzeniu operacji
        public T Value { get; set; } // Przechowuje wartość wynikową w przypadku sukcesu
        public string Error { get; set; } // Przechowuje komunikat o błędzie w przypadku niepowodzenia

        // Metoda statyczna zwracająca wynik operacji z sukcesem i wartością wynikową
        public static Result<T> Success(T value) => new Result<T> {IsSuccess = true, Value = value};
        
        // Metoda statyczna zwracająca wynik operacji z błędem
        public static Result<T> Failure(string error) => new Result<T> {IsSuccess = false, Error = error};
    }
}