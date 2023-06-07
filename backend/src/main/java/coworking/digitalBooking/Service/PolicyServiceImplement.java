package coworking.digitalBooking.Service;

import coworking.digitalBooking.Dto.PolicyDTO;
import coworking.digitalBooking.Entities.Policy;
import coworking.digitalBooking.Repository.PolicyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PolicyServiceImplement implements PolicyService{

    private final PolicyRepository policyRepository;
    private final ModelMapper modelMapper;

    public PolicyServiceImplement(PolicyRepository policyRepository, ModelMapper modelMapper) {
        this.policyRepository = policyRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public PolicyDTO searchById(Long id) {
        Policy policy = policyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Policy", "id", id));
        return mapDTO(policy);
    }

    @Override
    public List<PolicyDTO> searchAll() {
        List<Policy> policies = policyRepository.findAll();
        return policies.stream()
                .map(policy -> mapDTO(policy))
                .collect(Collectors.toList());
    }

    @Override
    public PolicyDTO createPolicy(PolicyDTO policyDTO) {
        Policy policy = mapEntity(policyDTO);
        Policy createdPolicy = policyRepository.save(policy);
        PolicyDTO policyResponse = mapDTO(createdPolicy);
        return policyResponse;
    }

    @Override
    public PolicyDTO updatePolicy(Long id, PolicyDTO policyDTO) {
        Policy existingPolicy = policyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Policy", "id", id));

        existingPolicy.setName(policyDTO.getName());
        existingPolicy.setDescription(policyDTO.getDescription());

        Policy updatedPolicy = policyRepository.save(existingPolicy);
        return mapDTO(updatedPolicy);

    }

    @Override
    public void deletePolicy(Long id) {
        policyRepository.deleteById(id);
    }


    // Convierte entidad a DTO
    private PolicyDTO mapDTO(Policy policy) {
        PolicyDTO policyDTO = modelMapper.map(policy, PolicyDTO.class);
        return policyDTO;
    }

    // Convierte de DTO a Entidad
    private Policy mapEntity(PolicyDTO policyDTO) {
        Policy policy = modelMapper.map(policyDTO, Policy.class);
        return policy;
    }
}
