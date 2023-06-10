package coworking.digitalBooking.Service;

import coworking.digitalBooking.Dto.CoworkingDTO;
import coworking.digitalBooking.Entities.Category;
import coworking.digitalBooking.Entities.Coworking;
import coworking.digitalBooking.Exceptions.ResourceNotFoundException;
import coworking.digitalBooking.Repository.CategoryRepository;
import coworking.digitalBooking.Repository.CoworkingRepository;
import coworking.digitalBooking.Repository.RatingRepository;
import coworking.digitalBooking.Repository.RatingRepository.RatingResult;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CoworkingServiceImple implements CoworkingService{

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CoworkingRepository coworkingRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RatingRepository ratingRepository;


    @Override
    public CoworkingDTO searchById(Long id){
        Coworking coworking = coworkingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coworking", "id",id));
        return mapDTO(coworking);
    }

    @Override
    public List<CoworkingDTO> searchAll(){
        List<Coworking> coworkings = coworkingRepository.findAll();
        return coworkings.stream().map(coworking -> mapDTO(coworking)).collect(Collectors.toList());
    }



    @Override
    public CoworkingDTO registerProduct(CoworkingDTO coworkingDTO) {
        Coworking coworkingDuplicate = coworkingRepository.findByName(coworkingDTO.getName());
        if (coworkingDuplicate != null){
            throw new ResourceNotFoundException("Coworking", "id 0 ya que no se ha creado debido a que ya existe un coworking con ese Nombre ", 0);
        }
        Category category = categoryRepository.findByIdCategory(coworkingDTO.getCategory().getIdCategory());
        if (category == null) {
            throw new ResourceNotFoundException("Category", "id",coworkingDTO.getCategory().getIdCategory());
        }

        Coworking coworking = mapEntity(coworkingDTO);
        Coworking newCoworking = coworkingRepository.save(coworking);
        CoworkingDTO coworkingResponse = mapDTO(newCoworking);
        return coworkingResponse;
    }

    @Override
    public CoworkingDTO update(CoworkingDTO coworkingDTO, Long id) {
        Coworking coworking = coworkingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coworking", "id",id));

        coworking.setName(coworkingDTO.getName());
        coworking.setCity(coworking.getCity());
        coworking.setAddress(coworkingDTO.getAddress());
        coworking.setDescription(coworkingDTO.getDescription());
        coworking.setImage(coworking.getImage());
        coworking.setCategory(coworking.getCategory());

        Coworking coworkingUpdate = coworkingRepository.save(coworking);

        return mapDTO(coworkingUpdate);
    }


    public void delete(Long id){
        Coworking coworking = coworkingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coworking", "id",id));
        coworkingRepository.delete(coworking);
    }

    // Convierte entidad a DTO
    private CoworkingDTO mapDTO(Coworking coworking) {
        CoworkingDTO coworkingDTO = modelMapper.map(coworking, CoworkingDTO.class);
        RatingResult ratingResult = ratingRepository.getRatingByIdCoworking(coworking.getIdCoworking());
        coworkingDTO.setRating(ratingResult);
        return coworkingDTO;
    }

    // Convierte de DTO a Entidad
    private Coworking mapEntity(CoworkingDTO coworkingDTO) {
        Coworking coworking = modelMapper.map(coworkingDTO, Coworking.class);
        return coworking;
    }



    public void validateCoordinates(double latitud, double longitud) {
        if (!validLatitude(latitud)) {
            throw new IllegalArgumentException("Latitud inválida, debe estar entre -90 y 90: " + latitud);
        }
        if (!validLongitude(longitud)) {
            throw new IllegalArgumentException("Longitud inválida, debe estar entre -180 y 180: " + longitud);
        }
    }

    private static boolean validLatitude(double latitude) {
        return latitude >= -90 && latitude <= 90;
    }

    private static boolean validLongitude(double longitude) {
        return longitude >= -180 && longitude <= 180;
    }

}
