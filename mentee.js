class mentee
{
    constructor(degree, school, location)
    {
        this.degree = degree; 
        this.school = school;
        this.location = location; 
    }
   
   
   
    //Accesors
    get degree()
    {
        return this.degree; 
    }
    get school()
    {
        return this.school; 
    }
    get location()
    {
        return this.location;
    }
}