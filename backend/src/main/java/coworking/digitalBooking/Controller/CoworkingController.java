package coworking.digitalBooking.Controller;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import coworking.digitalBooking.Dto.*;
import coworking.digitalBooking.Service.CoworkingPolicyService;
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
    public static class DataItem {
        @JsonProperty("id")
        private int id;

        @JsonProperty("description")
        private String description;
        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    @Autowired
    private CoworkingService coworkingService;
    @Autowired
    private ManageFileS3Service manageFilesS3Service;
    @Autowired
    private CoworkingPolicyService coworkingPolicyService;

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
            @RequestParam Long city,
            @RequestParam String address,
            @RequestParam String description,
            @RequestParam MultipartFile imageFile1,
            @RequestParam MultipartFile imageFile2,
            @RequestParam MultipartFile imageFile3,
            @RequestParam MultipartFile imageFile4,
            @RequestParam MultipartFile imageFile5,
            @RequestParam String coworkingPolicies
    ) {
        try {

            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setIdCategory(category);

            CityDTO cityDTO = new CityDTO();
            cityDTO.setIdCity(city);

            CoworkingDTO coworkingDTO = new CoworkingDTO();
            coworkingDTO.setName(name);
            coworkingDTO.setCategory(categoryDTO);
            coworkingDTO.setCity(cityDTO);
            coworkingDTO.setAddress(address);
            coworkingDTO.setDescription(description);

            String imageUrl1 = manageFilesS3Service.uploadFileToS3(imageFile1);
            String imageUrl2 = manageFilesS3Service.uploadFileToS3(imageFile2);
            String imageUrl3 = manageFilesS3Service.uploadFileToS3(imageFile3);
            String imageUrl4 = manageFilesS3Service.uploadFileToS3(imageFile4);
            String imageUrl5 = manageFilesS3Service.uploadFileToS3(imageFile5);


            coworkingDTO.setImage(imageUrl1 + ";" + imageUrl2 + ";" + imageUrl3+ ";" + imageUrl4 + ";" + imageUrl5);


            coworkingDTO = coworkingService.registerProduct(coworkingDTO);
            ObjectMapper mapper = new ObjectMapper();
            List<DataItem> items = mapper.readValue(coworkingPolicies, new TypeReference<List<DataItem>>() {});
            System.out.println(items);
            for (DataItem item : items) {
                System.out.println(item);
                CoworkingPolicyDTO coworkingPolicyDTO = new CoworkingPolicyDTO();
                PolicyDTO policyDTO = new PolicyDTO();
                policyDTO.setIdPolicy((long)item.getId());
                coworkingPolicyDTO.setDescription(item.getDescription());
                coworkingPolicyDTO.setPolicy(policyDTO);
                coworkingPolicyDTO.setCoworking(coworkingDTO);
                coworkingPolicyService.createCoworkingPolicy(coworkingPolicyDTO);
            }

            return new ResponseEntity<>(coworkingDTO, HttpStatus.CREATED);
        } catch (
                Exception e) {
            System.out.println(e);
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
        String[] imageUrls = coworkingDTO.getImage().split(";");
        for (String imageUrl : imageUrls) {
            manageFilesS3Service.deleteFileFromS3(imageUrl.trim());
        }
        return new ResponseEntity<>("Coworking Delete", HttpStatus.OK);
    }
}