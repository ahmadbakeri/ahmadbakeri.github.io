$('#bikin').on('click', function(e) {
	e.preventDefault();
	var namespergroup = parseInt($('.pergroup').val()),
		allnames = $('textarea').val().split('\n'),
		allnameslen = allnames.length;

	var numgroups = Math.ceil(allnameslen / namespergroup);
	
	if($('.numgroups').val()){
		numgroups = parseInt($('.numgroups').val());
		namespergroup = allnameslen / numgroups;
	}

	$('.groups').empty();

	for (i = 0; i < numgroups; i++) {
		$('.groups').append('<div class="group"  id="group' + (i+1) + '"><h2>Kelompok ' + (i+1) + '</h2></div>');
	}

	$('.group').each(function() {
		for (j = 0; j < namespergroup; j++) {
			var randname = Math.floor(Math.random() * allnames.length);
			if(allnames[randname]){
				$(this).append('<p>' + allnames[randname] + '</p>');
			}
			allnames.splice(randname, 1);
			console.log(allnames);
		}
	});
});

$('.toggle-wrap a').on('click', function(e){
	e.preventDefault();
	$('.wrap').toggleClass('alt');
	$('.pergroup-wrap, .numgroups-wrap').find('input').val('');
});

var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

//margins.left, // x coord   margins.top, { // y coord
$('#generatePDF').click(function () {
    doc.fromHTML($('.groups').html(), 15, 15, {
        'width': 700,
        'elementHandlers': specialElementHandlers
    });
    doc.save('Buat Kelompok.pdf');
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbwD5fIyc3KcoHX9qcpL53b4Lsp2uugzirHER5lqUld0vOrsaW1Dgbk4LXW5xIY_S3IDyw/exec';
const form = document.forms['wpu-contact-form'];
const btnKirim = document.querySelector('.btn-kirim');
const btnLoading = document.querySelector('.btn-loading');
const myAlert = document.querySelector('.my-alert');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // ketika tombol submit diklik
  // tampilkan tombol loading, hilangkan tombol kirim
  btnLoading.classList.toggle('d-none');
  btnKirim.classList.toggle('d-none');
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
	.then((response) => {
	  // tampilkan tombol Kirim, hilangkan tombol Loading
	  btnLoading.classList.toggle('d-none');
	  btnKirim.classList.toggle('d-none');
	  // tampilkan alert
	  myAlert.classList.toggle('d-none');
	  // reset
	  form.reset();
	  console.log('Success!', response);
	})
	.catch((error) => console.error('Error!', error.message));
});