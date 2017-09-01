var MyForm={
    valid: true,
    names: [],
    validate:function(){
        return {
            isValid:this.valid,
            errorFields:this.names
        }
    },
    getData: function(){
        return {
            fio: $('input[name="fio"]').val(),
            email: $('input[name="email"]').val(),
            tel: $('input[name="tel"]').val()
        }
    },
    setData: function(Object){
        $('input[name="fio"]').val(Object.fio);
        $('input[name="email"]').val(Object.email);
        $('input[name="tel"]').val(Object.tel);
    },
    submit: function () {
        var inputs=$('input');
        inputs.removeClass('error');
        var result=$('#resultContainer');
        this.names=[];
        this.valid=true;

        if(!(/^\w+\s\w+\s\w+$/g.test(this.getData().fio))){
            inputs.first().addClass('error');
            this.valid=false;
            this.names.push('fio');
        }
        if(!(/^(\s*)?[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(ya.ru|yandex.ru|yandex.ua|yandex.by|yandex.kz|yandex.com)$/g.test(this.getData().email))){
            inputs.eq(1).addClass('error');
            this.valid=false;
            this.names.push('email');
        }
        if(!(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/g.test(this.getData().tel)) || sum(this.getData().tel)>30){
            inputs.last().addClass('error');
            this.valid=false;
            this.names.push('tel');
        }

        if(this.validate().isValid){
            $(this).attr('disabled','true');
            $.ajax({
                type: 'GET',
                url: $('#myForm').attr('action'),
                success: function(data) {
                    console.log(data);
                    if(data.status==='success'){
                        result.addClass('success');
                        result.text('Success');
                    }
                    else if (data.status==='error'){
                        result.addClass('error');
                        result.text(data.reason);
                    }
                    else if(data.status==='progress'){
                        result.addClass('progress');
                        var q=this;
                        setTimeout(function(){$.ajax(q)}, data.timeout);
                    }
                }
            });
        }
    }
};

$(document).ready(function () {

    $('#submitButton').on('click',function (event) {
        event.preventDefault();
        MyForm.submit();
    });

});

function sum(value) {
    return parseInt(value[1])+parseInt(value[3])+parseInt(value[4])+parseInt(value[5])+
        parseInt(value[7])+parseInt(value[8])+parseInt(value[9])+parseInt(value[11])+parseInt(value[12])+
        parseInt(value[14])+parseInt(value[15]);
}