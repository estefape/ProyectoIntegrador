package coworking.digitalBooking.Repository;

import coworking.digitalBooking.Entities.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    Policy findByName(String name);
}
