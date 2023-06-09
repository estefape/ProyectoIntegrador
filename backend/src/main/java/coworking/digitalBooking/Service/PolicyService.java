package coworking.digitalBooking.Service;

import coworking.digitalBooking.Dto.PolicyDTO;

import java.util.List;

public interface PolicyService {

    public PolicyDTO searchById(Long id);
    public List<PolicyDTO> searchAll();

    public PolicyDTO createPolicy(PolicyDTO policyDTO);

    public PolicyDTO updatePolicy(Long id, PolicyDTO policyDTO);

    void deletePolicy(Long id);
}
