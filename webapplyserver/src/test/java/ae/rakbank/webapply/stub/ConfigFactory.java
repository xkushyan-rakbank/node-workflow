package ae.rakbank.webapply.stub;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class ConfigFactory {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    public static ObjectNode newDocumentControllerConfig() {

        ObjectNode config = objectMapper.createObjectNode();
        ObjectNode dehURIs = objectMapper.createObjectNode();

        dehURIs.put("getProspectDocumentsUri", "/deh-uri");
        dehURIs.put("getProspectDocumentByIdUri", "/deh-uri-by-id");

        config.set("DehURIs", dehURIs);
        config.set("BaseURLs", objectMapper.createObjectNode().set("local", objectMapper.createObjectNode().put("DehBaseUrl", "http://deh-test-url")));

        return config;

    }

    public static JsonNode newProspectControllerConfig() {
        ObjectNode config = objectMapper.createObjectNode();
        ObjectNode dehURIs = objectMapper.createObjectNode();

        dehURIs.put("createProspectUri", "/deh-uri");
        dehURIs.put("getProspectUri", "/deh-uri");
        dehURIs.put("updateProspectUri", "/deh-uri");
        dehURIs.put("searchProspectUri", "/deh-uri");

        config.set("DehURIs", dehURIs);
        config.set("BaseURLs", objectMapper.createObjectNode().set("local", objectMapper.createObjectNode().put("DehBaseUrl", "http://deh-test-url")));

        return config;

    }

}
