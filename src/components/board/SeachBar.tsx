import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AreaProps {
  setKeyword: (keyword: string) => void;
  setSearch: (search: string) => void;
  setSelectedCategory: string;
}

interface FormData {
  search: string,
  keyword: string,
  category: string
}

function SearchBar({ setKeyword, setSearch, setSelectedCategory }: AreaProps) {

  const [formData, setFormData] = useState<FormData>({ search: "제목", keyword: "", category: setSelectedCategory });

  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }

  const handleSearch = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    if (e.type === 'click' || (e.type === 'keydown' && (e as React.KeyboardEvent<HTMLElement>).key === 'Enter')) {
      e.preventDefault();
    

    const trimmedKeyword = formData.keyword.trim();

    if(trimmedKeyword && formData.search){
      setKeyword(trimmedKeyword);
      setSearch(formData.search);
      
      console.log("formData.keyword " + formData.keyword);
      navigate(`/board/list/${setSelectedCategory}?page=1&keyword=${trimmedKeyword}&search=${formData.search}`);
    } else {
      alert('검색어를 입력해주세요')
    }  
  }
}

  return (
    <div style={{ margin: 20, padding: 20 }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "13rem" },
          display:'flex', alignItems:'center', justifyContent:'center'
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl sx={{ m: 1, minWidth: 10 }}>
          <NativeSelect 
            defaultValue={"none"}
            inputProps={{
              name: "search",
              id: "search",
            }} onChange={handleInputChange}
          >
            <option value={"title"}>제목</option>
            <option value={"plus"}>제목+내용</option>
          </NativeSelect>
        </FormControl>
        <TextField id="keyword" type="search" variant="standard" name="keyword" onChange={handleInputChange} onKeyDown={handleSearch}/>
        <IconButton sx={{ p: "10px" }} aria-label="search" onClick={handleSearch} >
          <SearchIcon />
        </IconButton>
      </Box>
    </div>
  );
}

export default SearchBar;