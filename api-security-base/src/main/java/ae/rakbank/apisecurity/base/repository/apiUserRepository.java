package ae.rakbank.apisecurity.base.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import ae.rakbank.apisecurity.base.model.apiUserData;

import java.util.List;
import java.util.Optional;

@Repository
public interface apiUserRepository extends MongoRepository<apiUserData, String> {

	 @Query(value = "{'emailAddress': {$regex : '^?0$', $options: 'i'}}")
	 Optional<apiUserData> findByEmailAddressIgnoreCase(String emailAddress);
	 
	 List<apiUserData> findByMerchantId(String merchantId);
	
}
