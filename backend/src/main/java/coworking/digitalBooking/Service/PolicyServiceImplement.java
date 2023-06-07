package coworking.digitalBooking.Service;

import coworking.digitalBooking.Dto.PolicyDTO;
import coworking.digitalBooking.Entities.Policy;
import coworking.digitalBooking.Repository.PolicyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PolicyServiceImplement implements PolicyService{

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PolicyRepository policyRepository;

    @Override
    public PolicyDTO searchById(Long id) {
        Policy policy = policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found"));
        return convertToDTO(policy);
    }

    @Override
    public List<PolicyDTO> searchAll() {
        List<Policy> policies = policyRepository.findAll();
        return policies.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PolicyDTO createPolicy(PolicyDTO policyDTO) {
        Policy policy = convertToEntity(policyDTO);
        Policy savedPolicy = policyRepository.save(policy);
        return convertToDTO(savedPolicy);
    }

    @Override
    public PolicyDTO updatePolicy(Long id, PolicyDTO policyDTO) {
        Policy existingPolicy = policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        Policy updatedPolicy = convertToEntity(policyDTO);
        updatedPolicy.setIdPolicy(existingPolicy.getIdPolicy());

        Policy savedPolicy = policyRepository.save(updatedPolicy);
        return convertToDTO(savedPolicy);
    }

    @Override
    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }

    private PolicyDTO convertToDTO(Policy policy) {
        PolicyDTO policyDTO = new PolicyDTO();
        BeanUtils.copyProperties(policy, policyDTO);
        return policyDTO;
    }

    private Policy convertToEntity(PolicyDTO policyDTO) {
        Policy policy = new Policy();
        BeanUtils.copyProperties(policyDTO, policy);
        return policy;
    }
}
