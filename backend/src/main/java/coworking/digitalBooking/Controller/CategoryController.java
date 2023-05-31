package coworking.digitalBooking.Controller;

import coworking.digitalBooking.Dto.CategoryDTO;
import coworking.digitalBooking.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/Categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping()
    public List<CategoryDTO> searchAll(){
        return categoryService.searchAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> searchCategory(@PathVariable(name = "id") Long id){
        return ResponseEntity.ok(categoryService.searchById(id));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping()
    public ResponseEntity<CategoryDTO> registerCategory(@RequestBody CategoryDTO categoryDTO){
        return new ResponseEntity<>(categoryService.registerCategory(categoryDTO),HttpStatus.CREATED);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> update(@RequestBody CategoryDTO categoryDTO, @PathVariable(name = "id") Long id){
        CategoryDTO categoryDResponse = categoryService.update(categoryDTO,id);
        return new ResponseEntity<>(categoryDResponse, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(name = "id") Long id){
        categoryService.delete(id);
        return new ResponseEntity<>("Category Delete",HttpStatus.OK);
    }

}
