package pe.cibertec.proyecto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.cibertec.proyecto.model.db.Productos;
import pe.cibertec.proyecto.repository.ProductosRepository;
import java.util.List;

@Service
public class ProductosService {
	
	@Autowired
	private ProductosRepository productosRepository;

	public List<Productos> listarProductos(){
		return productosRepository.findAll();
	}
	
	public void registrarProductos(Productos productos) {
		productosRepository.save(productos);
	}
	
	public void eliminarProductos(Integer id_productos) {
		productosRepository.deleteById(id_productos);
	}
}
