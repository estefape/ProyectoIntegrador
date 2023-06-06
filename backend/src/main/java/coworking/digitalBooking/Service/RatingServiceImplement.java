package coworking.digitalBooking.Service;


import coworking.digitalBooking.Dto.RatingDTO;
import coworking.digitalBooking.Entities.Rating;
import coworking.digitalBooking.Repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import java.util.List;


@Service
public class RatingServiceImplement implements RatingService {

    @PersistenceContext
    private EntityManager entityManager;

    private RatingRepository ratingRepository;

    @Autowired
    public RatingServiceImplement(RatingRepository ratingRepository){
        this.ratingRepository = ratingRepository;
    }

    public Rating register(Integer idCoworking, Integer puntuacion) {
        Rating rating = new Rating(null, idCoworking, puntuacion);
        return ratingRepository.save(rating);
    }

    public List<Object[]> getRatingByIdCoworking(Long idCoworking) {
        String sql = "SELECT idCoworking, AVG(puntuacion) AS rating, COUNT(*) AS valoraciones " +
                    "FROM rating " +
                    "WHERE idCoworking = :idCoworking";
    
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("idCoworking", idCoworking);
    
        @SuppressWarnings("unchecked")
        List<Object[]> results = query.getResultList();
    
        return results;
    }


    @Override
    public RatingDTO registerRating(RatingDTO ratingDTO) {
        return null;
    }
}
