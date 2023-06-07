package coworking.digitalBooking.Service;

import coworking.digitalBooking.Dto.CoworkingPolicyDTO;

import java.util.List;

public interface CoworkingPolicyService {

    public CoworkingPolicyDTO getCoworkingPolicyById(Long id);
    public List<CoworkingPolicyDTO> getAllCoworkingPolicies();
    public CoworkingPolicyDTO createCoworkingPolicy(CoworkingPolicyDTO coworkingPolicyDTO);
    public CoworkingPolicyDTO updateCoworkingPolicy(Long id, CoworkingPolicyDTO coworkingPolicyDTO);
    void deleteCoworkingPolicy(Long id);
}
