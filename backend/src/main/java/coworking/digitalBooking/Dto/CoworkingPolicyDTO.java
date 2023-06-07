package coworking.digitalBooking.Dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CoworkingPolicyDTO {
    private Long idCoworkingPolicy;
    private CoworkingDTO coworking;
    private PolicyDTO policy;
}