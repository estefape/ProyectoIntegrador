package coworking.digitalBooking.Service;

import coworking.digitalBooking.Dto.CoworkingPolicyDTO;
import coworking.digitalBooking.Dto.PolicyDTO;
import coworking.digitalBooking.Entities.CoworkingPolicy;
import coworking.digitalBooking.Entities.Policy;
import coworking.digitalBooking.Repository.CoworkingPolicyRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CoworkingPolicyImplement implements CoworkingPolicyService{

    private final CoworkingPolicyRepository coworkingPolicyRepository;
    private final ModelMapper modelMapper;

    public CoworkingPolicyImplement(CoworkingPolicyRepository coworkingPolicyRepository, ModelMapper modelMapper) {
        this.coworkingPolicyRepository = coworkingPolicyRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CoworkingPolicyDTO getCoworkingPolicyById(Long id) {
        CoworkingPolicy coworkingPolicy = coworkingPolicyRepository.findById()
                .orElseThrow(() -> new ResourceNotFoundException("CoworkingPolicy", "id", id))
        return mapDTO(coworkingPolicy);
    }

    @Override
    public List<CoworkingPolicyDTO> getAllCoworkingPolicies() {
        List<CoworkingPolicy> coworkingPolicies = coworkingPolicyRepository.findAll();
        return coworkingPolicies.stream()
                .map(coworkingPolicy -> mapDTO(coworkingPolicy))
                .collect(Collectors.toList());
    }

    @Override
    public CoworkingPolicyDTO createCoworkingPolicy(CoworkingPolicyDTO coworkingPolicyDTO) {
        CoworkingPolicy coworkingPolicy = mapEntity(coworkingPolicyDTO);
        CoworkingPolicy createCoworkingPolicy = coworkingPolicyRepository.save(coworkingPolicy);
        CoworkingPolicyDTO coworkingPolicyResponse = mapDTO(createCoworkingPolicy);
        return coworkingPolicyResponse;
    }

    @Override
    public CoworkingPolicyDTO updateCoworkingPolicy(Long id, CoworkingPolicyDTO coworkingPolicyDTO) {
        CoworkingPolicy existingCoworkingPolicy = coworkingPolicyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CoworkingPolicy", "id", id));

        existingCoworkingPolicy.setCoworking(coworkingPolicyDTO.getCoworkingId());
        existingCoworkingPolicy.setPolicy(coworkingPolicyDTO.getPolicyId());

        CoworkingPolicy updatedCoworkingPolicy = coworkingPolicyRepository.save(existingCoworkingPolicy);
        return mapDTO(updatedCoworkingPolicy);
    }

    @Override
    public void deleteCoworkingPolicy(Long id) {
        coworkingPolicyRepository.deleteById(id);
    }

    // Convierte entidad a DTO
    private CoworkingPolicyDTO mapDTO(CoworkingPolicy coworkingPolicy) {
        CoworkingPolicyDTO coworkingPolicyDTO = modelMapper.map(coworkingPolicy, CoworkingPolicyDTO.class);
        return coworkingPolicyDTO;
    }

    // Convierte de DTO a Entidad
    private CoworkingPolicy mapEntity(CoworkingPolicyDTO coworkingPolicyDTO) {
        CoworkingPolicy coworkingPolicy = modelMapper.map(coworkingPolicyDTO, CoworkingPolicy.class);
        return coworkingPolicy;
    }
}
