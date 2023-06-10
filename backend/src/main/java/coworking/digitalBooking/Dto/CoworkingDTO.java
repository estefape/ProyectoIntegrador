package coworking.digitalBooking.Dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import coworking.digitalBooking.Repository.RatingRepository.RatingResult;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CoworkingDTO {

    private long idCoworking;
    private String name;
    private String address;
    private String description;
    private String image;
    private RatingResult rating;
    private String coworkingRulesPolicy;
    private String healthSafetyPolicy;
    private String cancellationPolicy;
    private CityDTO city;
    private CategoryDTO category;
//    private List<CoworkingPolicyDTO> coworkingPolicies;
}