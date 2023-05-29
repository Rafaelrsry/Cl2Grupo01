package pe.cibertec.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import pe.cibertec.proyecto.model.db.Productos;
import pe.cibertec.proyecto.request.ProductosRequest;
import pe.cibertec.proyecto.response.ResultadoResponse;
import pe.cibertec.proyecto.service.ProductosService;

@Controller
@RequestMapping("/productos")
public class ProductosController {
	
	@Autowired
	private ProductosService productosService;
	
	
	@GetMapping("/listarProductos")
	@ResponseBody
	public List<Productos> listarProductos(){
		return productosService.listarProductos();
	}
	
	@PostMapping("/registrarProductos")
	@ResponseBody
	public ResultadoResponse registrarProductos(
			@RequestBody ProductosRequest productosRequest
			) {
		String mensaje ="Producto registrado exitosamente";
		Boolean respuesta = true;
		try {			
			Productos objProductos = new Productos();
			if(productosRequest.getId_producto() == null) {
				objProductos.setId_producto(productosRequest.getId_producto());
			}
			objProductos.setPdt_foto(productosRequest.getPdt_foto());
			objProductos.setPdt_producto(productosRequest.getPdt_producto());
			objProductos.setPdt_porcion(productosRequest.getPdt_porcion());
			objProductos.setPdt_tortaCompleta(productosRequest.getPdt_tortaCompleta());
			objProductos.setPdt_precioPorcion(productosRequest.getPdt_precioPorcion());
			objProductos.setPdt_precioCompleta(productosRequest.getPdt_precioCompleta());
			objProductos.setCodigo(productosRequest.getCodigo());
			productosService.registrarProductos(objProductos);
			
			
		}catch(Exception ex) {
			mensaje = "Producto no registrado";
			respuesta = false;
		}
		return ResultadoResponse.builder()
				.mensaje(mensaje)
				.respuesta(respuesta)
				.build();
	}
	
	
	@DeleteMapping("/eliminarProductos")
	@ResponseBody
	public ResultadoResponse eliminarProductos(
			@RequestBody ProductosRequest productosRequest) {
		String mensaje = "Producto(s) Eliminado(s) Correctamente";
		Boolean respuesta = true;
		try {
			productosService.eliminarProductos(productosRequest.getId_producto());
		}catch (Exception e) {
			mensaje = "Producto no eliminado";
			respuesta = false;
		}
		return ResultadoResponse.builder()
				.mensaje(mensaje)
				.respuesta(respuesta)
				.build();
	}
	
	
	
	
}



