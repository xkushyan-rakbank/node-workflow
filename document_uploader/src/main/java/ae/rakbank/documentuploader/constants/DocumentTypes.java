package ae.rakbank.documentuploader.constants;

import java.util.Arrays;
import java.util.List;

public class DocumentTypes {

    private DocumentTypes() {
    }

    public static final List<String> ALLOWED_DOCUMENT_TYPES = Arrays.asList(
            "Constitutional_Documents",
            "Passport_Copies",
            "Others",
            "Others_Documents",
            "Bank_Statements",
            "Invoices_Contracts_Shipment_MOU_Custom",
            "Company_Address_Proof",
            "Personal_Bank_Statements",
            "CV_Personal_Background"); 
}
