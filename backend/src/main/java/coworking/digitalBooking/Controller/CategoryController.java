package coworking.digitalBooking.Controller;

import coworking.digitalBooking.Entities.Category;
import coworking.digitalBooking.Service.CategoryService;
import coworking.digitalBooking.Service.ManageFileS3Service;
import jakarta.servlet.annotation.MultipartConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.io.File;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private ManageFileS3Service manageFilesS3Service;

    @GetMapping("/all")
    public ResponseEntity<List<Category>> searchAll(){
        return ResponseEntity.ok(categoryService.searchAll());
    }

    @PostMapping(value = "/register", consumes = {"multipart/form-data", "application/octet-stream"})
    public ResponseEntity<Category> registerCategory(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile imageFile){
        try {
            // Aquí puedes usar la instancia de S3FileManager para subir el archivo a S3
            String imageUrl = manageFilesS3Service.uploadFileToS3(imageFile);
            Category cat = new Category(name, description, imageUrl);

            return ResponseEntity.ok(categoryService.registerCategory(cat));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){

        Category category = categoryService.searchById(id).orElse(null);
        categoryService.delete(id);
        manageFilesS3Service.deleteFileFromS3(category.getImage());

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