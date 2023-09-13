import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import api from 'lib/api';
import Cookies from 'js-cookie';
import logo from '../styles/img/edit_logo2.png';
import SearchBox from './header/SearchBox';

const pages = [
  { text: '홈', href: '/' },
  { text: '반려일지', href: '/todo' },
  { text: '우리동네', href: '/board' }
]

function Header({ isLoggedIn }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [petImg, setPetImg] = React.useState<string | null>(null);

  useEffect(() => {
    handlePetUrl()
  }, [petImg])

    //헤더 아바타에 들어갈 펫 이미지 
    const handlePetUrl = () => {
      if (Cookies.get("key")) {
        api.get("pet/petinfo")
          .then((res) => {
            console.log("res.data " + res.data.data.petUrl)
            setPetImg(res.data.data.petUrl);
          }).catch((error) => {
            api.post("member/reissue")
              .then((res) => {
                console.log("accesstoken" + res.data.data);
                Cookies.set("key", res.data.data);
                console.log('토큰 재발급 성공');
              })
              .catch((err) => {
                console.log(err.message)
              })
            console.log(error.message)
          })
      }
    }

  const settings = isLoggedIn
    ? [
      { label: "마이 페이지", href: "/member/mypage" },
      { label: "펫 등록", href: "/pet/petform" },
      { label: "펫 수정", href: "/pet/edit" },
      { label: "로그아웃", href: "/member/logout" }
    ]
    : [{ label: "로그인", href: "/member/login" },
    { label: "회원가입", href: "/member/signup" }
    ];


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2, backgroundColor: '#fff' }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', my: 2 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: 'none', md: 'flex' },
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              <Box
                component="img"
                sx={{ height: 60, mr: 6 }}
                alt="Logo"
                src={logo}
              />
            </Typography>

            {/* 나머지 AppBar 내용 */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                letterSpacing: '.3rem',
              }}
            >
              <Box
                component="img"
                sx={{ height: 60 }}
                alt="Logo"
                src={logo}
              />
            </Typography>

            <SearchBox />

            <Box sx={{ flexGrow: 0}}>
              <Tooltip title="">
                <IconButton onClick={handleOpenUserMenu} >
                  <Avatar alt="Remy Sharp" src={petImg}
                    sx={{ width: 45, height: 45, backgroundColor: '#FFAE8B' }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.label} component={Link} to={setting.href} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* 왼쪽에 고정되는 메뉴 */}
      <Box
        sx={{
          width: '250px', // 원하는 너비
          position: 'fixed',
          top: '64px', // AppBar의 높이만큼 여백을 둠
          bottom: 0,
          backgroundColor: '#fff', // 원하는 배경색상으로 조정
          zIndex: 1, // 메뉴는 AppBar 위에 표시되도록 설정
          overflowY: 'auto', // 내용이 넘칠 때 스크롤 가능하도록 설정
        }}
      >
        {pages.map((page) => (
          <Button
            key={page.text}
            onClick={handleCloseNavMenu}
            href={page.href}
            sx={{
              display: 'block',
              fontFamily: 'SDSamliphopangche_Basic',
              fontSize: 20,
              color: '#404040',
              textAlign: 'center',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: "transparent"
              }
            }}
          >
            {page.text}
          </Button>
        ))}
      </Box>
    </div>
  );
}

export default Header;
