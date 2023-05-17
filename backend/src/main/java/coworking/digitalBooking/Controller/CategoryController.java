package coworking.digitalBooking.Controller;

import coworking.digitalBooking.Entities.Category;
import coworking.digitalBooking.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public ResponseEntity<List<Category>> searchAll(){
        return ResponseEntity.ok(categoryService.searchAll());
    }

    @PostMapping("/register")
    public ResponseEntity<Category> registerCategory(@RequestBody Category cat){
        return ResponseEntity.ok(categoryService.registerCategory(cat));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){
        categoryService.delete(id);
        return ResponseEntity.ok("removed category");
    }


    @GetMapping("/{id}")
    public ResponseEntity<Category> searchCategory(@PathVariable Integer id){
        Category category = categoryService.searchById(id).orElse(null);
        return ResponseEntity.ok(category);
    }


    @PutMapping("/update")
    public ResponseEntity<Category> update(@RequestBody Category cat){
        ResponseEntity<Category> response = null;
        if(cat.getIdCategory() !=null && categoryService.searchById(cat.getIdCategory()).isPresent())
            response = ResponseEntity.ok(categoryService.update(cat));
        else
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return response;
    }


}
