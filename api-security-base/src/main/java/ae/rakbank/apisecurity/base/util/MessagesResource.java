/**
 * 
 */
package ae.rakbank.apisecurity.base.util;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.stereotype.Component;

/**
 * The Class MessagesResource.
 *
 * @author Sumanth V, Raghu
 * 
 *         Apr 9, 2019
 */
@Component
public class MessagesResource implements MessageSourceAware {

	/** The message source. */
	@Autowired
	private MessageSource messageSource;

	/**
	 * Sets the message source.
	 *
	 * @param messageSource the new message source
	 */
	@Override
	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

	/**
	 * Gets the message.
	 *
	 * @param key the key
	 * @param obj the obj
	 * @return the message
	 */
	public String getMessage(String key, Object[] obj) {
		return messageSource.getMessage(key, obj, new Locale("el")); // TODO
		                                                             // read
		                                                             // from
		                                                             // request
		                                                             // context
		                                                             // - Raghu
	}
}
