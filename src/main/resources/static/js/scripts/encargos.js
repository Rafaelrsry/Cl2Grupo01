$(document).on("click", "#btnAgregarEncargo", function(){
	$("#txtanticipoEnc").val("");
	$("#txtfechacreEnc").val("");
	$("#txtfechaentEnc").val("");
	$("#txtestadoEnc").val("");
	$("#hddidregistroEnc").val("0");
	
	modalencargos.classList.remove('ocultar')
	  fondo.classList.remove('ocultar')
});

$(document).on("click", ".btnactualizarEnc", function(){
	$("#txtanticipoEnc").val($(this).attr("data-enc_anticipo"));
	$("#txtfechacreEnc").val($(this).attr("data-enc_fechacreacion"));
	$("#txtfechaentEnc").val($(this).attr("data-enc_fechaentrega"));
	$("#txtestadoEnc").val($(this).attr("data-enc_estado"));
	$("#hddidregistroEnc").val($(this).attr("data-id_encargos"));
	
	modalencargos.classList.remove('ocultar')
	  fondo.classList.remove('ocultar')
});

$(document).on("click", ".btnguardarEnc", function(){
	$.ajax({
		/*var id_venta = "1";*/
		type: "POST",
		url: "/encargos/registrarEncargos",
		contentType: "application/json",
		
		data: JSON.stringify({
			id_encargos: $("#hddidregistroEnc").val(),
			id_ventas : "1",
			enc_anticipo: $("#txtanticipoEnc").val(),
			enc_fechacreacion: $("#txtfechacreEnc").val(),
			enc_fechaentrega: $("#txtfechaentEnc").val(),
			enc_estado: $("#txtestadoEnc").val()
		}),
		success: function(resultado){
			alert(resultado.mensaje);
			ListarEncargo();
		}
	});
	modalencargos.classList.add('ocultar')
	  fondo.classList.add('ocultar')
});

$(document).on("click",".btneliminarEnc",function(){
	$("#hddidelmenc").val("");
	$("#hddidelmenc").val($(this).attr("data-id_encargos"));
	$("#mensajeeliminarEnc").text("¿Está seguro de eliminar el Encargo?");
	
	
	modalpreguntaElmEnc.classList.remove('ocultar')
	  fondo.classList.remove('ocultar')

});

$(document).on("click", ".btneliminarElmEnc", function(){
	$.ajax({
		type: "DELETE",
		contentType: 'application/json',
		url: "/encargos/eliminarEncargos",
		data: JSON.stringify({
			id_encargos: $("#hddidelmenc").val()
		}),
		success: function(resultado){
			ListarEncargo();
			console.log("Datos enviados:",JSON.parse(this.data));
			console.log(resultado)
			alert(resultado.mensaje);			
		}
	})
	modalpreguntaElmEnc.classList.add('ocultar')
	  fondo.classList.add('ocultar')
})

function ListarEncargo(){
	$.ajax({
		type: "GET",
		url: "/encargos/listarEncargos",
		dataType: "json",
		success: function(resultado){
			console.log(resultado);
			$("#tblencargos > tbody").html("");
			$.each(resultado, function(index, value){
				$("#tblencargos > tbody").append("<tr>"+
						"<td>"+value.id_encargos+"</td>"+
						"<td>"+value.enc_anticipo+"</td>"+
						"<td>"+value.enc_fechacreacion+"</td>"+
						"<td>"+value.enc_fechaentrega+"</td>"+
						"<td>"+value.enc_estado+"</td>"+
						"<td>"+
							"<button type='button' class='btn btn-success btnactualizarEnc'"+
							" data-id_encargos='"+value.id_encargos+"'"+
							" data-enc_anticipo='"+value.enc_anticipo+"'"+
							" data-enc_fechacreacion='"+value.enc_fechacreacion+"'"+
							" data-enc_fechaentrega='"+value.enc_fechaentrega+"'"+
							" data-enc_estado='"+value.enc_estado+"'"+
							"><i class='fas fa-pen'></i></button></td>"+
						"<td>"+
							"<button type='button' class='btn btn-danger btneliminarEnc'"+	
							" data-id_encargos='"+value.id_encargos+"'"+
							"><i class='fas fa-trash'></i></button></td>"+							
						"</tr>")
			})
			
			
		}
	})
}