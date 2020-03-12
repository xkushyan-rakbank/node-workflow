package ae.rakbank.webapply.services.otp;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;

import java.util.function.Function;
import java.util.function.Supplier;

@RequiredArgsConstructor
public class OtpVerifyGenerateResponse {

    private final boolean verifyResult;
    private final HttpEntity<?> httpEntity;
    private Supplier<?> ifVerifySuccessThen;

    public <T> OtpVerifyGenerateResponse ifVerifySuccessThen(Supplier<T> supplier) {
        ifVerifySuccessThen = supplier;
        return this;
    }

    public <R> R execute(Function<HttpEntity<?>, R> supplier) {
        if (verifyResult) ifVerifySuccessThen.get();
        return supplier.apply(httpEntity);
    }

}
