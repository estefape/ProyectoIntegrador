package coworking.digitalBooking.Service;


import coworking.digitalBooking.Entities.Coworking;
import coworking.digitalBooking.Repository.CoworkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoworkingService {

    @Autowired
    private CoworkingRepository coworkingRepository;

    public ResponseEntity<String> registerProduct(Coworking cow){
        Coworking findCow = coworkingRepository.findByName(cow.getName());
        if (findCow !=null){
            return ResponseEntity.badRequest().body("Ya existe un Coworking con este nombre");
        }
        coworkingRepository.save(cow);
        return ResponseEntity.ok("Coworking Agregado Correctamente");
    }

    public Coworking update(Coworking cow){
        return coworkingRepository.save(cow);
    }

    public Optional<Coworking> searchById(Integer id){
        return coworkingRepository.findById(id);
    }

    public List<Coworking> searchAll(){
        return coworkingRepository.findAll();
    }

    public void delete(Integer id){
        Optional<Coworking> productSearch = searchById(id);
        if(productSearch.isPresent())
            coworkingRepository.deleteById(id);
    }

}
