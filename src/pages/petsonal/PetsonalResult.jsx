import React, { useContext, useEffect, useState } from "react";
import S from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { PetsonalContext } from "../../context/petsonalContext";
import ProductResult from "./ProductResult";

const PetsonalResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { result } = useContext(PetsonalContext);

  const [petsonalResult, setpetsonalResult] = useState([]);
  const [colorResult, setColorResult] = useState({
    imageSrc: "",
    message: [],
    boxColor: "",
    title: "",
  });

  useEffect(() => {
    const getPetsonalResult = async () => {
      const response = await fetch(`http://localhost:10000/petsonal/result/${id}`);
      if (!response.ok) return console.error(`데이터가 없습니다.`);
      const petsonalResult = await response.json();

      if (petsonalResult.id === null) {
        navigate(`/petsonal/test/${id}`);
        alert("진행하신 테스트 결과가 없습니다.");
      } else {
        setpetsonalResult(petsonalResult);
        
        const color = petsonalResult.petColor;
        if (result[color]) {
          setColorResult(result[color]);
        }
      }
    };

    getPetsonalResult().catch(console.error);
  }, [id, navigate, result]);
  
  const { petName, petImage, petsonalCute, petsonalChic, petsonalCalm, petsonalActive, petsonalLazy, petsonalDiligent, petsonalCoward, petsonalBrave } = petsonalResult;
  const { imageSrc, message, boxColor, title } = colorResult;
  
  return (
    <div>
      <S.Frame>
        <S.ResultContainer>
          <S.ColorWrap>
            <img src={`${process.env.PUBLIC_URL}${imageSrc}`} alt="펫 컬러" />
          </S.ColorWrap>

          <S.OrangeResult>
            {message.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </S.OrangeResult>

          <S.ResultBox color={boxColor}>
            <S.PetProfile>
              <S.PetImage
                src={`${process.env.PUBLIC_URL}/assets/images/pet/${petImage}`}
                alt="펫 사진"
              />
              <p>{petName}</p>
            </S.PetProfile>
            <S.RateWrap>
              <S.ResultName>{title}</S.ResultName>
              <S.PercentageContainer>
                <S.AllRate>
                  <S.ResultCategory>
                    <span>시크</span>
                    <span>귀염</span>
                  </S.ResultCategory>
                  <S.PercentageWrap>
                    <span>
                      {petsonalChic}
                      <S.Percentage>(%)</S.Percentage>
                    </span>
                    <S.Percent>
                      <S.CuteAndChicGage
                        style={{ width: `${petsonalCute}%` }}
                      ></S.CuteAndChicGage>
                    </S.Percent>
                    <span>
                      {petsonalCute}
                      <S.Percentage>(%)</S.Percentage>
                    </span>
                  </S.PercentageWrap>
                </S.AllRate>
                <S.AllRate>
                  <S.ResultCategory>
                    <span>차분</span>
                    <span>발랄</span>
                  </S.ResultCategory>
                  <S.PercentageWrap>
                    <span>
                      {petsonalCalm}
                      <S.Percentage>(%)</S.Percentage>
                    </span>
                    <S.Percent>
                      <S.CalmAndActive
                        style={{ width: `${petsonalActive}%` }}
                      ></S.CalmAndActive>
                    </S.Percent>
                    <span>
                      {petsonalActive}
                      <S.Percentage>(%)</S.Percentage>
                    </span>
                  </S.PercentageWrap>
                </S.AllRate>
                <S.AllRate>
                  <S.ResultCategory>
                    <span>게으름</span>
                    <span>부지런함</span>
                  </S.ResultCategory>
                  <S.PercentageWrap>
                    <span>
                      {petsonalLazy}
                      <S.Percentage>(%)</S.Percentage>
                    </span>
                    <S.Percent>
                      <S.LazyAndDilight
                        style={{ width: `${petsonalDiligent}%` }}
                      ></S.LazyAndDilight>
                    </S.Percent>
                    <span>
                      {petsonalDiligent}
                      <S.Percentage>(%)</S.Percentage>
                    </span>
                  </S.PercentageWrap>
                </S.AllRate>
                <S.AllRate>
                  <S.ResultCategory>
                    <span>겁쟁이</span>
                    <span>용감함</span>
                  </S.ResultCategory>
                  <S.PercentageWrap>
                    <span>
                      {petsonalCoward}
                      <S.Percentage>(%)</S.Percentage>
                    </span>
                    <S.Percent>
                      <S.CowardAndBrave
                        style={{ width: `${petsonalBrave}%` }}
                      ></S.CowardAndBrave>
                    </S.Percent>
                    <span>
                      {petsonalBrave}
                      <S.Percentage>(%)</S.Percentage>
                    </span>
                  </S.PercentageWrap>
                </S.AllRate>
              </S.PercentageContainer>
            </S.RateWrap>
          </S.ResultBox>

          <ProductResult />
        </S.ResultContainer>
      </S.Frame>
    </div>
  );
};

export default PetsonalResult;
