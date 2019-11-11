package ae.rakbank.apisecurity.base.security;

import ae.rakbank.apisecurity.base.model.apiUserData;
import ae.rakbank.apisecurity.base.repository.apiUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements UserDetailsService {

	private apiUserRepository applicationUserRepository;

	@Autowired
	public AuthenticationServiceImpl(apiUserRepository applicationUserRepository) {
		this.applicationUserRepository = applicationUserRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException,LockedException {
		apiUserData applicationUser = null;
		Optional<apiUserData> skiplyUserData = applicationUserRepository.findByEmailAddressIgnoreCase(username);
		if (skiplyUserData.isPresent()) {
			if (!skiplyUserData.get().isAccountNonLocked()) {
				throw new LockedException(username);
			}
			applicationUser = skiplyUserData.get();
		}
		if (applicationUser == null) {
			throw new UsernameNotFoundException(username);
		}

		return new User(applicationUser.getEmailAddress(), applicationUser.getPassword(),
				false, false, false, false, applicationUser.getAuthorities());
	}
}
