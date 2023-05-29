package pe.cibertec.proyecto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.cibertec.proyecto.model.db.Encargos;
import pe.cibertec.proyecto.repository.EncargosRepository;

@Service
public class EncargosService {

	@Autowired
	private EncargosRepository encargosRepository;
	
	public List<Encargos> listarEncargos(){
		return encargosRepository.findAll();
	}
	
	public void registrarEncargos(Encargos encargos) {
		encargosRepository.save(encargos);
	}
	
	public void eliminarEncargos(Integer id_encargos) {
		encargosRepository.deleteById(id_encargos);
	}
}