import React,{useState} from 'react'
import '../styles/JobFilter.css'

export const JobFilter = ({setFilters}) => {

  const [selectedDomain,setSelectedDomain]=useState('')

  const jobDomains=[
      {value:'any',label:'Any'},
      {value:'fullstack',label:'Full Stack Development'},
      {value:'frontend',label:'Frontend Development'},
      {value:'backend',label:'Backend Development'},
      {value:'datascience',label:'Data Science'}
  ]

    const handleDomainChange = (e) => {
        const value=e.target.value
        setSelectedDomain(value)
        setFilters(prev=>({...prev,domain:value}))
    }

    const handleCheckboxChange = (e,key) => {
        const value=e.target.value
        let normalized=value.toLowerCase()

        if(key==='jobType'){
          normalized=value.toLowerCase().replace(' ','-')
        }
        if(key==='duration'){
          const mapping={
            '1 Month - 3 Months':'1-3m',
            '3 Months - 6 Months':'3-6m',
            '6 Months - 12 Months':'6-12m',
            'More than 1 year':'1year+'
          }
          normalized=mapping[value]||value
        }
        if(key==='stipend'){
          const mapping={
            'Below ₹1,000':'<1k',
            '₹1,000 - ₹5,000':'1k-5k',
            '₹5,000 - ₹10,000':'5k-10k',
            '₹10,000 - ₹15,000':'10k-15k',
            '₹15,000 - ₹20,000':'15k-20k',
            '₹20,000 - ₹30,000':'20k-30k',
            '₹30,000 - ₹40,000':'30k-40k',
            'Above ₹40,000':'40k+',
            'Unpaid':'unpaid'
          }
          normalized=mapping[value]||value
      }

      setFilters(prev=>{
          const arr=prev[key]||[]
          const updated=e.target.checked?[...arr,normalized]:arr.filter(item=>item!==normalized)
          return {...prev,[key]:updated}
      })
    }

    return(
        <div className="filters-container">
          <div className="dept-container">
            <h2>DEPARTMENT</h2>
            <div className="dept-display">
              {['CSE','IT','ECE','ADS','AML','EEE','MECH','CIVIL','CHEM'].map(dept=>(
                <label key={dept}>
                  <input type="checkbox" value={dept} onChange={(e)=>handleCheckboxChange(e,'department')}/>
                  {dept}
                </label>
              ))}
            </div>
          </div>

          <div className="jobdomain-container">
            <h2>JOB DOMAIN</h2>
            <label>Select Job Domain:</label>
            <br/>
            <select name="jobDomain" value={selectedDomain} onChange={handleDomainChange}>
              <option value="">Select a job domain</option>
              {jobDomains.map(domain=>(
                <option key={domain.value} value={domain.value}>{domain.label}</option>
              ))}
            </select>
            <div className="selected-domain">
              <h3>Selected Job Domain:</h3>
              <p>{selectedDomain?jobDomains.find(d=>d.value===selectedDomain)?.label:'None'}</p>
            </div>
          </div>

          <div className="jobtype-container">
            <h2>JOB TYPE</h2>
            <div className="jobtype-display">
              {['Full-time','Part-time','Internship','Freelance'].map(type=>(
                <label key={type}>
                  <input type="checkbox" value={type} onChange={(e)=>handleCheckboxChange(e,'jobType')}/>
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="worklocation-container">
            <h2>WORK LOCATION</h2>
            <div className="worklocation-display">
              {['Onsite','Hybrid','Remote'].map(loc=>(
                <label key={loc}>
                  <input type="checkbox" value={loc} onChange={(e)=>handleCheckboxChange(e,'location')}/>
                  {loc}
                </label>
              ))}
            </div>
          </div>

          <div className="jobduration-container">
            <h2>JOB DURATION</h2>
            <div className="jobduration-display">
              {['1 Month - 3 Months','3 Months - 6 Months','6 Months - 12 Months','More than 1 year'].map(dur=>(
                <label key={dur}>
                  <input type="checkbox" value={dur} onChange={(e)=>handleCheckboxChange(e,'duration')}/>
                  {dur}
                </label>
              ))}
            </div>
          </div>

          <div className="stipend-container">
            <h2>STIPEND</h2>
            <div className="stipend-display">
              {['Below ₹1,000','₹1,000 - ₹5,000','₹5,000 - ₹10,000','₹10,000 - ₹15,000','₹15,000 - ₹20,000','₹20,000 - ₹30,000','₹30,000 - ₹40,000','Above ₹40,000','Unpaid'].map(stip=>(
                <label key={stip}>
                  <input type="checkbox" value={stip} onChange={(e)=>handleCheckboxChange(e,'stipend')}/>
                  {stip}
                </label>
              ))}
            </div>
          </div>
        </div>
    )
}
