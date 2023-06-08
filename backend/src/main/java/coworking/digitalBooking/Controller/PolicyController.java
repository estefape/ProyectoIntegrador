package coworking.digitalBooking.Controller;

import coworking.digitalBooking.Dto.PolicyDTO;
import coworking.digitalBooking.Service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/Policies")
@CrossOrigin(origins = "*")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @GetMapping()
    public List<PolicyDTO> searchAll() {
        return policyService.searchAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<PolicyDTO> searchCategory(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(policyService.searchById(id));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping()
    public ResponseEntity<PolicyDTO> registerCategory(
            @RequestBody PolicyDTO policyDTO
    ) {
        return new ResponseEntity<>(policyService.createPolicy(policyDTO), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<PolicyDTO> update(@RequestBody PolicyDTO policyDTO, @PathVariable(name = "id") Long id) {
        return new ResponseEntity<>(policyService.updatePolicy(id, policyDTO), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(name = "id") Long id) {
        policyService.deletePolicy(id);
        return new ResponseEntity<>("Category Delete", HttpStatus.OK);
    }
}