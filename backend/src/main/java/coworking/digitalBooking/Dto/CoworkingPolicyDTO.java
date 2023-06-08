package coworking.digitalBooking.Dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CoworkingPolicyDTO {
    private Long idCoworkingPolicy;
    @JsonIgnore
    private CoworkingDTO coworking;
    private PolicyDTO policy;
    private String description;
}