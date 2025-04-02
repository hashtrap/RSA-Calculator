


document.getElementById("variables_form").addEventListener("submit",function(event)
{
    event.preventDefault()

    var p=document.getElementById("p_value").value 
    var q=document.getElementById("q_value").value 

    if(!isNaN(p) && !isNaN(q))
    {
        
        let value_1= check_prime(p)
        let value_2=check_prime(q)
        if(value_1 &&value_2 && p!==q)
        {
            console.log(`${p} and ${q} are prime`)
            var n =p*q
            document.getElementById("n_value").value=n
            let p_1=p-1 
            let q_1=q-1 
            var phi=p_1*q_1
            document.getElementById("phi_value").value=phi
        }

        else
        {
            alert(`The values are not prime or are the same values`)
        }

    }

    else
    {
        alert("The inputs are not numbers");
    }

})

document.getElementById("new_variables").addEventListener("submit",function(event)
{
    event.preventDefault()

    var phi=document.getElementById("phi_value").value
    var e=document.getElementById("e_value").value

    if(!isNaN(e))
    {
        var result=gcd(e,phi)
        if(result!==1)
        {
            let paragraph=`<p>The number is a not a co prime,choose another</p>`
            let target=document.getElementById("coprime")

            target.insertAdjacentHTML("afterend",paragraph)
        }

        else
        {
            let paragraph=`<p id="new_line">The number is a co prime</p>`
            let target=document.getElementById("coprime")
            target.insertAdjacentHTML("afterend",paragraph)

            
        }
    }

    else
    {
        alert("You have not entered a number for e")
    }

    
    
})

document.getElementById("final_state").addEventListener("submit",function(event)
{
    event.preventDefault()
})

document.getElementById("signature").addEventListener("submit",function(event)
{
    event.preventDefault()
})



function check_prime(target) //checks the primality of the functions
{
    let prime=true

    if(target<=1)
    {   
        prime=false
        return prime
    }

    else 
    {
        for(let i=2;i**2<=target;i++)
        {
            if(target%i===0)
            {
                prime=false;
                break;
                return prime
            }
        }
        return prime
    }
}

function gcd(a, b) // finds the gcd between two numbers
{
    let e = Math.min(a, b);
    let gcd = 1;

    for (let i = 1; i <= e; i++) {
        if (a % i === 0 && b % i === 0) {
            gcd = i;
        }
    }

    return gcd;
}

function power_modulo(base,expo,n) // function to do power modulos
{
        var c = 1
		var m = expo
		var t = base
		
		while( m > 0 )
		{
			let k = Math.floor( m/2 )
			let r = m - 2*k
			if( r == 1 )
				c = (c*t) % n
			t = (t*t) % n 
			m = k
		}			
		return c
}

function mod_inverse(e,phi) // mod inverse used  to find d
{
    e=BigInt(e)
    phi=BigInt(phi)

    for(let i=BigInt(2);i<phi;i++)
    {
        if((e*i)%phi===BigInt(1))
        {
            
            return Number(i)
        }
    }
    return -1
}

function Encrypt()// encrypting  function which gathers the neccesary data from specific fields
{
    let m=document.getElementById("m_value").value
    let e=document.getElementById("e_value").value
    let n=document.getElementById("n_value").value
    let c=power_modulo(m,e,n)
    document.getElementById("c_value").value=c

}

function Decrypt() // decrypting function which gathers the neccesary data from specific fields
{
    let phi=document.getElementById("phi_value").value
    let e=document.getElementById("e_value").value
    let n=document.getElementById("n_value").value
    let c=document.getElementById("c_value").value
    let d=mod_inverse(e,phi)
    let m=power_modulo(c,d,n)
    document.getElementById("m_value").value=m
}

function set_d() // function to dispaly the d value on screen
{
    let phi=document.getElementById("phi_value").value
    let e=document.getElementById("e_value").value
    let d=mod_inverse(e,phi)
    document.getElementById("d_value").value=d
}

function sign() // the signing function
{
    let phi=document.getElementById("phi_value").value
    let e=document.getElementById("e_value").value
    let d=mod_inverse(e,phi)
    let n=document.getElementById("n_value").value
    let m=document.getElementById("message").value
    M=power_modulo(m,d,n)
    document.getElementById("signed_value").value=M
}

function unsign() // function that gathers the neccesary values to do the authentication
{
    let e=document.getElementById("e_value").value
    let n=document.getElementById("n_value").value
    let c=document.getElementById("signed_value").value
    C=power_modulo(c,e,n)
    document.getElementById("unsigned_value").value=C
}



