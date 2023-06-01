package coworking.digitalBooking.Controller;

import coworking.digitalBooking.Dto.CategoryDTO;
import coworking.digitalBooking.Dto.CoworkingDTO;
import coworking.digitalBooking.Service.CoworkingService;
import coworking.digitalBooking.Service.ManageFileS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/Products")
@CrossOrigin(origins = "*")
public class CoworkingController {

    @Autowired
    private CoworkingService coworkingService;
    @Autowired
    private ManageFileS3Service manageFilesS3Service;

    @GetMapping()
    public List<CoworkingDTO> searchAll() {
        return coworkingService.searchAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoworkingDTO> searchProduct(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(coworkingService.searchById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(consumes = {"multipart/form-data", "application/octet-stream"})
    public ResponseEntity<CoworkingDTO> registerProduct(
            @RequestParam String name,
            @RequestParam Long category,
            @RequestParam String city,
            @RequestParam String address,
            @RequestParam String description,
            @RequestParam Integer rating,
            @RequestParam MultipartFile imageFile1,
            @RequestParam MultipartFile imageFile2,
            @RequestParam MultipartFile imageFile3,
            @RequestParam MultipartFile imageFile4,
            @RequestParam MultipartFile imageFile5
    ) {
        try {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setIdCategory(category);
            CoworkingDTO coworkingDTO = new CoworkingDTO();
            coworkingDTO.setName(name);
            coworkingDTO.setCategory(categoryDTO);
            coworkingDTO.setCity(city);
            coworkingDTO.setAddress(address);
            coworkingDTO.setDescription(description);
            coworkingDTO.setRating(rating);

            String imageUrl1 = manageFilesS3Service.uploadFileToS3(imageFile1);
            String imageUrl2 = manageFilesS3Service.uploadFileToS3(imageFile2);
            String imageUrl3 = manageFilesS3Service.uploadFileToS3(imageFile3);
            String imageUrl4 = manageFilesS3Service.uploadFileToS3(imageFile4);
            String imageUrl5 = manageFilesS3Service.uploadFileToS3(imageFile5);


            coworkingDTO.setImage(imageUrl1 + ";" + imageUrl2 + ";" + imageUrl3+ ";" + imageUrl4 + ";" + imageUrl5);

           // coworkingDTO.setImage(imageUrl1.concat(";").concat(imageUrl2).concat(";").concat(imageUrl3).concat(";").concat(imageUrl4).concat(";").concat(imageUrl5));

            return new ResponseEntity<>(coworkingService.registerProduct(coworkingDTO), HttpStatus.CREATED);
        } catch (
                IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CoworkingDTO> update(@RequestBody CoworkingDTO coworkingDTO, @PathVariable(name = "id") Long id) {
        CoworkingDTO coworkingResponse = coworkingService.update(coworkingDTO, id);
        return new ResponseEntity<>(coworkingResponse, HttpStatus.OK);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(name = "id") Long id) {

        CoworkingDTO coworkingDTO = coworkingService.searchById(id);
        coworkingService.delete(id);
        manageFilesS3Service.deleteFileFromS3(coworkingDTO.getImage());
        return new ResponseEntity<>("Coworking Delete", HttpStatus.OK);
    }

}