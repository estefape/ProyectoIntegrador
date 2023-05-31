package coworking.digitalBooking.Controller;

import coworking.digitalBooking.Dto.CoworkingDTO;
import coworking.digitalBooking.Service.CoworkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/Products")
@CrossOrigin(origins = "*")
public class CoworkingController {

    @Autowired
    private CoworkingService coworkingService;

    @GetMapping()
    public List<CoworkingDTO> searchAll(){
        return coworkingService.searchAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoworkingDTO> searchProduct(@PathVariable(name = "id") Long id){
        return ResponseEntity.ok(coworkingService.searchById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping()
    public ResponseEntity<CoworkingDTO> registerProduct(@RequestBody CoworkingDTO coworkingDTO){
        return new ResponseEntity<>(coworkingService.registerProduct(coworkingDTO),HttpStatus.CREATED);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CoworkingDTO> update(@RequestBody CoworkingDTO coworkingDTO, @PathVariable(name = "id") Long id) {
        CoworkingDTO coworkingResponse = coworkingService.update(coworkingDTO,id);
        return new ResponseEntity<>(coworkingResponse, HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(name = "id") Long id){
        coworkingService.delete(id);
        return new ResponseEntity<>("Coworking Delete",HttpStatus.OK);
    }

}