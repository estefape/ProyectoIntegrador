package coworking.digitalBooking.Repository;

import coworking.digitalBooking.Entities.Coworking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoworkingRepository extends JpaRepository<Coworking,Integer> {

    Coworking findByName(String name);

}
