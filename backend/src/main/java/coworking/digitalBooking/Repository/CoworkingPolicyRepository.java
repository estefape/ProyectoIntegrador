package coworking.digitalBooking.Repository;

import coworking.digitalBooking.Entities.CoworkingPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoworkingPolicyRepository extends JpaRepository<CoworkingPolicy, Long>{

    CoworkingPolicy findByIdCoworkingPolicyId(Long idCoworkingPolicy);

}
