package coworking.digitalBooking.Service;

import coworking.digitalBooking.Dto.CoworkingDTO;

import java.util.List;

public interface CoworkingService {

    public CoworkingDTO searchById(Long id);

    public List<CoworkingDTO> searchAll();

    public CoworkingDTO registerProduct(CoworkingDTO coworkingDTO);

    public CoworkingDTO update(CoworkingDTO coworkingDTO, Long id);

    public void delete(Long id);
}
