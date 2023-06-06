package coworking.digitalBooking.Repository;

import coworking.digitalBooking.Entities.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating,Integer> {

    Rating findByIdCoworking(Integer idCoworking);

}