package coworking.digitalBooking.Controller;

import coworking.digitalBooking.Entities.Coworking;
import coworking.digitalBooking.Service.CoworkingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Products")
public class CoworkingController {

    @Autowired
    private CoworkingService coworkingService;

    @GetMapping("/all")
    public ResponseEntity<List<Coworking>> searchAll(){
        return ResponseEntity.ok(coworkingService.searchAll());
    }

    @PostMapping("/register")
    public ResponseEntity<Coworking> registerProduct(@RequestBody Coworking cow){
        return ResponseEntity.ok(coworkingService.registerProduct(cow));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){
        coworkingService.delete(id);
        return ResponseEntity.ok("removed product");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coworking> searchProduct(@PathVariable Integer id){
        Coworking coworking = coworkingService.searchById(id).orElse(null);
        return ResponseEntity.ok(coworking);
    }

    @PutMapping("/update")
    public ResponseEntity<Coworking> update(@RequestBody Coworking cow){
        ResponseEntity<Coworking> response = null;
        if(cow.getIdCoworking() !=null && coworkingService.searchById(cow.getIdCoworking()).isPresent())
            response = ResponseEntity.ok(coworkingService.update(cow));
        else
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return response;
    }


}
