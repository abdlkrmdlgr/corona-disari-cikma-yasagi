<template>
    <div id="app">

        <div class="mb-1 shadow p-1 bg-white rounded text-muted font-weight-bold">
            <div class="h2 font-weight-bold text-center col-md-12 p-3">
                <img src="./assets/icon/favicon-96x96.png"
                     alt="Sokağa Çıkabilir miyim?"
                     width="32"/>
                <i>Sokağa Çıkabilir miyim?</i>
            </div>
        </div>

        <div class="card card-body" v-if="kisiYasaklariTabActive">
            <div class="card mb-1 p-4 shadow p-3 bg-white rounded" v-if="!isPersonalCreatedComputed">
                <h6>Lütfen yaş aralığızı seçiniz</h6>
                <p>
                <span>
                    <select v-model="selectedAgeChoise" style="padding:10px;">
                        <option value="1"> 20 Yaş Altı </option>
                        <option value="2"> 20 ile 65 Arası</option>
                        <option value="3"> 65 Üstü</option>
                    </select>
                </span>
                    <span class="btn btn-success h5" @click="savePersonalInfo">
                    <font-awesome-icon icon="save"/>
                </span>
                </p>
                <a @click="istisnaModalShow=!istisnaModalShow" href="#">İstisna grubuna dahilseniz lütfen istisna
                    kurallarını okuyunuz.</a>
            </div>

            <div class="card mb-1 p-4 shadow p-3 bg-white rounded" v-if="this.evdeOlmaZamani>0">
                <p class="text-center">
                    <font-awesome-icon icon="running" class="fa-3x text-success"/>
                </p>
                <h6>Sokakların tadını çıkartın.</h6>
                <p>Sosyal mesafeye ve maske takmaya özen gösterin. </p>
                <p></p>
                <h6>Evde Olmak İçin </h6>
                <div class="h5">
                    <div style="width: 190px;margin-left: auto;margin-right: auto;">
                        <div class="saatGosterimi" :class="saatGosterimiClass">{{evdeOlmakIcinKalanSureComputed[0]}}</div>
                        <div class="float-left font-weight-bold p-1" style="font-size: 24px">:</div>
                        <div class="saatGosterimi" :class="saatGosterimiClass">{{evdeOlmakIcinKalanSureComputed[1]}}</div>
                        <div class="float-left font-weight-bold p-1" style="font-size: 24px">:</div>
                        <div class="saatGosterimi" :class="saatGosterimiClass">{{evdeOlmakIcinKalanSureComputed[2]}}</div>
                    </div>
                </div>
            </div>


            <div class="card mb-1 p-4 shadow p-3 bg-white rounded" v-if="this.yasaginKalkmaZamani>0">
                <p class="text-center">
                    <font-awesome-icon icon="ban" class="fa-3x text-danger"/>
                </p>
                <h2>Yasaklı Zamandasınız</h2>
                <p>Sabırsızlandığınızı biliyorum. Fakat bir süre daha evde kalmak zorundasınız.</p>
                <p></p>
                <h5>Özgürlüğünüz İçin</h5>
                <div class="h5">
                    <div style="width: 190px;margin-left: auto;margin-right: auto;">
                        <div class="saatGosterimi" :class="saatGosterimiClass">{{yasaginKalmakmasiIcinKalanSureComputed[0]}}</div>
                        <div class="float-left font-weight-bold p-1" style="font-size: 24px">:</div>
                        <div class="saatGosterimi" :class="saatGosterimiClass">{{yasaginKalmakmasiIcinKalanSureComputed[1]}}</div>
                        <div class="float-left font-weight-bold p-1" style="font-size: 24px">:</div>
                        <div class="saatGosterimi" :class="saatGosterimiClass">{{yasaginKalmakmasiIcinKalanSureComputed[2]}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="mekanlarTabActive" class="card-body">
            <div class="card mb-1 p-4 shadow p-3 bg-white rounded" v-if="isAcikMekanlarRenderedComputed">
                <h4>Açık Mekanlar</h4>
                <Mekanlar v-bind:mekanlar.sync="acikMekanlar" v-bind:durum="true"></Mekanlar>
            </div>

            <div class="card mb-1 p-4 shadow p-3 bg-white rounded" v-if="isKapaliMekanlarRenderedComputed">
                <h4>Kapalı Mekanlar</h4>
                <Mekanlar v-bind:mekanlar.sync="kapaliMekanlar" v-bind:durum="false"></Mekanlar>
            </div>

        </div>

        <b-modal v-model="istisnaModalShow" title="İstisnalar"
                 size="lg"
                 :centered=true :scrollable=true headerCloseLabel="Kapat" :hide-footer="true"
                 aria-label="İstisnalar"
                 no-button>
            <div class="col-md-12 small">
                <p class="text-right small">
                    <a v-if="personalCreated" @click="yenidenYasSec" href="#" class="mr-2">
                        Yeniden Yaş Seç
                    </a>

                    <a href="https://twitter.com/bortecoder">@bortecoder</a>
                </p>
                <CustomAccordion v-bind:content.sync="content"/>
            </div>
        </b-modal>

        <nav class="navbar fixed-bottom" style="left: auto!important;">
            <a @click="istisnaModalShow=!istisnaModalShow" href="#" class="mr-2">
                <FontAwesomeIcon icon="info-circle" size="3x" title="İstisnalar"
                                 class="text-danger sticky-top plusIcon shadow bg-white"
                                 style="border: 4px solid #fff;border-radius: 30%;"/>
            </a>
        </nav>

    </div>
</template>

<script>

    import CustomAccordion from "./components/CustomAccordion";
    import Mekanlar from "./components/Mekanlar";

    export default {
        name: 'App',
        components: {
            CustomAccordion,
            Mekanlar
        },
        data: function () {
            return {
                mekanlarTabActive: true,
                kisiYasaklariTabActive: true,
                istisnaModalShow: false,
                isSimdiCikabilir: false,
                selectedAgeChoise: 0,
                haftaninBuGunu: 1,
                personalCreated: false,
                evdeOlmaZamani: 0,
                evdeOlmakIcinKalanSure: 0,
                yasaginKalkmaZamani: 0,
                yasaginKalkmasiIcinKalanSure: [],
                acikMekanlar: [],
                kapaliMekanlar: [],
                content: [
                    {
                        title: '20 yaş altında olup da üniversitelerde yüz yüze eğitim gören öğrenciler ile profesyonel veya milli sporcu olanlar sokağa çıkma kısıtlamasından muaf mıdır?',
                        description: 'Bazı üniversitelerde teknik eğitim veren mühendislik fakültesi/tıp fakültesi gibi bölümlerde yüz yüze eğitim devam etmektedir. Bu yaş grubundaki öğrencilere durumlarını belgelemeleri amacıyla üniversite yönetimince ders programını gösterir şekilde özel bir belge verilecek olup, bu belgenin gerektiğinde ibrazı ile 20 yaşın altındaki öğrenciler bu yaş grubu için getirilen sokağa çıkma kısıtlamasına tabi olmayacaktır. 20 yaş altı profesyonel veya milli sporcular, profesyonel veya milli sporcu olduklarını belgelemeleri kaydıyla sportif faaliyetleri (müsabaka, antrenman, bu amaçlarla seyahat vb.) kapsamında sokağa çıkma kısıtlamasına tabi olmayacaktır.',
                        active: false,
                        id: 1
                    },
                    {
                        title: '65 yaş ve üzeri vatandaşlarımızın şehirlerarası seyahatlerinde izin belgesi gerekli midir?',
                        description: '65 yaş ve üzeri vatandaşlarımız 20.05.2020 tarih ve 8206 sayılı Genelgemiz çerçevesinde ancak Seyahat İzin Belgesi almaları koşuluyla şehirlerarası seyahat edebilecek olup her türlü şehirlerarası toplu ulaşım aracına (uçak, otobüs, tren, vapur vb.) ilişkin bilet satış sürecinde Seyahat İzin Belgesinin alınmış olması şartı aranacaktır.',
                        active: false,
                        id: 2
                    },
                    {
                        title: '65 yaş ve üzerindeki sağlık çalışanları (doktor, diş hekimi, eczacı vb.), seçimle göreve gelenler (belediye başkanı, muhtar vb.), avukat, akademisyen, veteriner, serbest muhasebeci-mali müşavir gibi meslek gruplarının mensupları bu yaş grubu için getirilen sokağa çıkma kısıtlamasına tabi midir?',
                        description: 'Genelge ile gün içerisinde 10:00 ile 13:00 saatleri arasında sokağa çıkabilecek 65 yaş ve üzeri vatandaşlarımızdan iş yerleri ile illiyetlerini gösteren çalışma/SGK kaydı vb. belgeyi ibraz edenler istisna tutulduğundan yukarıda adı geçen meslekleri icra eden 65 yaş ve üzeri vatandaşlarımız kısıtlamadan muaftır.',
                        active: false,
                        id: 3
                    },
                    {
                        title: '20 yaş altı genç ve çocuklar şehir içi veya şehirlerarası yolculuğu nasıl yapacaklar?',
                        description: '20 yaş altı gençler ve çocuklarımız 30.05.2020 tarih ve 8558 sayılı Genelgemizde belirlenen çerçeve içerisinde yanlarında veli/vasisinin bulunması şartı ile herhangi bir belge aranmaksızın şehir içi ve şehirlerarası yolculuk yapabileceklerdir.',
                        active: false,
                        id: 4
                    },
                    {
                        title: 'Çocuklarını kreş ya da bakıcıya bırakmak zorunda olan ebeveynlerin çocuklar için getirilen kısıtlama saatlerinde çocuklarını getirip götürmesi mümkün müdür?',
                        description: '29.05.2020 tarih ve 8483 sayılı Genelgemiz çerçevesinde sokağa çıkma kısıtlamasına tabi çocuklarımız ve gençlerimizin ihtiyaca göre bakıcıya, aile büyüklerine, kreş̧ veya gündüz bakımevlerine gidebilmesi ve kısıtlama getirilen saat dilimleri içerisinde veli/vasilerinin nezaretinde yolculuk yapabilmesi mümkündür.',
                        active: false,
                        id: 5
                    },
                    {
                        title: 'KPSS, Kariyer Mesleklerin Giriş Sınavları, TOEFL, IELTS gibi ülke genelinde düzenlenen sınavlara girecek kişiler sokağa çıkma kısıtlamasından istisna mıdır?',
                        description: 'Genelgemiz ile KPSS ve diğer merkezi sınavlara katılacağını belgeleyenler ile refakatçilerinin kısıtlamadan muaf oldukları belirlendiğinden bu sınavlara girecek her yaş grubundaki kişiler sokağa çıkma saat kısıtlamasına tabi olmayacaklardır.',
                        active: false,
                        id: 6
                    },
                    {
                        title: 'İnşaat sektörü hafta sonu uygulanacak sokağa çıkma kısıtlamasından muaf mıdır?',
                        description: 'İnşaat sektörü ve çalışanları Genelgenin 5.1/ğ ve 5.2/ğ hükümleri uyarınca üretim ve imalat tesisleri ile buralarda çalışanlar için getirilen istisna hükmü kapsamında olduğundan sokağa çıkma kısıtlamasından muaf tutulacaktır.',
                        active: false,
                        id: 7
                    },
                    {
                        title: 'Hastanelerde (özel hastaneler dahil) bulunan yeme-içme mekanları (kantinler, kafe vb.) Genelge kapsamında yeme-içme yerleri için getirilen kısıtlamalara tabi midir?',
                        description: 'Hastanelerde bulunan yeme-içme mekânları (kantinler, kafe vb.) Genelge kapsamında yeme-içme yerleri için getirilen kısıtlamalara (çalışma saatleri, servis yöntemi vb.) doğrudan tabi değildir. Hastanelerde bulunan yeme-içme yerlerinin çalışma usul ve esasları hastane yönetimlerinin vereceği karar doğrultusunda belirlenecektir.',
                        active: false,
                        id: 8
                    },
                    {
                        title: 'Lokanta ve restoranlara yönelik getirilen kısıtlamalara oteller ve konaklama tesislerindeki lokanta veya restoranlar tabi midir? ',
                        description: 'Oteller ve konaklama tesislerindeki lokanta veya restoranlar sadece konaklama yapan müşterilerine yönelik yemek hizmeti verebilecek olup diğer lokanta veya restoranlara yönelik getirilen kısıtlamalara tabi değildir. Ancak oteller ve konaklama tesislerindeki lokanta veya restoranlar dışarıya paket servisi yoluyla satış yapamazlar.',
                        active: false,
                        id: 9
                    },
                    {
                        title: 'Havaalanları içerisindeki lokanta ve restoranlar Genelgede getirilen kısıtlamalardan muaf mıdır?',
                        description: 'Havaalanları içerisindeki yeme içme mekanları (lokanta, restoran, kafe vb.) sadece yolculara ve ulaştırma sektöründe çalışanlara hizmet vermek koşuluyla Genelge kapsamında yeme-içme yerleri için getirilen kısıtlamalara tabi değildir.',
                        active: false,
                        id: 10
                    },
                    {
                        title: 'Deniz turizmi amaçlı ticari faaliyet gösteren tekne ve yatlar gezi maksatlı teknelerine aldıkları müşterilerine yeme-içme amaçlı servis yapabilirler mi?',
                        description: 'Deniz turizmi amaçlı ticari faaliyet gösteren tekne ve yatlar gezi maksatlı teknelerine aldıkları müşterilerine yeme-içme amaçlı servis yapamazlar.',
                        active: false,
                        id: 11
                    }, {
                        title: 'Seyahat acentalarının vermiş olduğu tur, paket tur, konaklama veya transfer hizmetlerinden yararlananlar genelgenin istisnası kapsamında mıdır?',
                        description: 'Seyahat acentalarının vermiş olduğu tur, paket tur, konaklama veya transfer hizmetlerinden yararlanan tüketiciler “5.2/u) Şehirlerarası toplu ulaşım araçlarında (uçak, otobüs, tren, gemi vb.) görevli olanlar ile bu toplu ulaşım araçlarıyla seyahat edeceğini bilet, rezervasyon kodu vb. ibraz ederek belgeleyenler” istisna kapsamındadır.',
                        active: false,
                        id: 12
                    }, {
                        title: 'Havalimanlarındaki mağazalar (giyim, hediyelik eşya, vb.) 10:00-20:00 saatleri arasında hizmet sunabilme uygulamasına tabi midir?',
                        description: 'Havalimanlarındaki mağazalar (giyim, hediyelik eşya vb. işyerleri), Genelgenin 1. maddesi ile faaliyet gösterebilecekleri zaman aralığı 10:00-20:00 saatleri arası olarak belirlenen iş yerleri kapsamında değildir.',
                        active: false,
                        id: 13
                    }, {
                        title: 'Tekel büfeleri marketler için getirilen çalışma saati kısıtlamasına tabi midir?',
                        description: 'Tekel büfeleri, Genelgenin 1. maddesi kapsamında marketler için getirilen çalışma saati kısıtlamalarına (saat 10:00-20:00 arası çalışabilme) tabidir.',
                        active: false,
                        id: 14
                    }, {
                        title: 'Pastaneler ile simit, börek, poğaça vb. ürünleri üreten ve satan iş yerleri saat 10.00’dan önce satış yapabilir mi?',
                        description: 'Pastaneler ile simit, börek, poğaça vb. ürünleri üreten ve satan işyerleri sadece bu ürünlerin satışını sabah 08:00-10:00 saatleri arasında gel-al şeklinde yapabilirler.',
                        active: false,
                        id: 15
                    }, {
                        title: 'Azınlık cemaatlerine mensup 65 yaş ve üzeri din adamları, bu yaş grubu için getirilen sokağa çıkma kısıtlamasına tabi midir?',
                        description: 'Azınlık cemaatlerinin 65 yaş ve üzeri din adamlarının bu yaş grupları için kısıtlama öngörülen saatlerde dini vecibeleri yerine getirmelerinde herhangi bir kısıtlama bulunmamakta olup haricen izin alınmasına gerek yoktur.',
                        active: false,
                        id: 16
                    }, {
                        title: '65 yaş ve üzeri ile 20 yaş altı vatandaşlarımız için belirlenen sokağa çıkma kısıtlamasının uygulaması Cuma namazları açısından nasıl olacaktır?',
                        description: 'Belirtilen yaş gruplarında yer alan vatandaşlarımızdan Cuma namazı kılmak isteyenler için İl/İlçe Umumi Hıfzıssıhha Kurullarınca; 65 yaş ve üzeri büyüklerimizin sokağa çıkma saati Cuma namazı bitimine kadar uzatılabilecek, 20 yaş altındaki gençlerimizin sokağa çıkış saati ise Cuma namazına gidebilecekleri şekilde öne alınabilecektir.',
                        active: false,
                        id: 17
                    }, {
                        title: 'Kreşlerde yüz yüze eğitim faaliyetleri devam edecek mi?',
                        description: 'Sağlık ve Milli Eğitim Bakanlıklarıyla yapılan görüşmeler sonucunda; çalışan anne-babaların durumu da göz önünde bulundurularak Milli Eğitim Bakanlığına bağlı kreşlerle birlikte diğer kamu kurum ve kuruluşları ile özel eğitim kurumları bünyesindeki kreşlerin yüz yüze eğitim faaliyetlerine devam edebilmeleri gerektiği değerlendirilmiştir.',
                        active: false,
                        id: 18
                    }, {
                        title: 'Sokak hayvanlarının beslenmesi nasıl olacak?',
                        description: '30.04.2020 tarih 7486 sayılı Genelgemiz kapsamında “Hayvan Besleme Grubu Üyeleri” ile sokak hayvanlarını beslemek isteyen diğer vatandaşlarımız hafta sonları uygulanacak sokağa çıkma kısıtlamasından muaf olacaktır. Önceki sokağa çıkma kısıtlamalarında olduğu gibi hayvan severlerimiz hafta sonlarında uygulanacak olan sokağa çıkma kısıtlaması sırasında sokak hayvanlarının beslenme ihtiyaçlarını giderebileceklerdir.',
                        active: false,
                        id: 19
                    }, {
                        title: 'Reklam ve dizi sektörünün çekimlerinin hafta sonu saat 20.00’den sonraya sarkması nedeniyle kendilerine izin verilebilir mi?',
                        description: 'Reklam ve dizi sektörü ile çalışanları, Genelgenin 5.1/ğ ve 5.2/ğ hükümleri uyarınca üretim ve imalat tesisleri ile buralarda çalışanlar için getirilen istisna hükmü kapsamında olduğundan sokağa çıkma kısıtlamasından muaf tutulacaktır.',
                        active: false,
                        id: 20
                    }, {
                        title: 'Pazaryerleri Genelge’de marketler için getirilen çalışma saatleri kısıtlamasına tabi midir?',
                        description: 'Pazarcı esnafımız, sebze-meyve gibi ürünlerin tedariki ve pazaryerine nakliyesi/kurulumu bağlamında çalışma saatleri sınırlamasına tabi değildir. Ancak pazaryerlerinde 10:00 ile 20:00 saatleri arasında vatandaşlarımıza satış yapılabilecek olup bu açıdan marketler için getirilen çalışma saati kısıtlamasına tabi olacaktır.',
                        active: false,
                        id: 21
                    }, {
                        title: 'Otel rezervasyonu bulunan kişiler sokağa çıkma kısıtlaması süresi içerisinde özel araçlarıyla seyahat edebilirler mi?',
                        description: 'Otel rezervasyonu bulunan vatandaşlarımız konaklama rezervasyonunun başlangıç zamanı ile konaklama tesisine ulaşım süresi içerisinde rezervasyonu olduğunu belgelemek/ibraz etmek kaydıyla herhangi bir izin almaksızın özel araçlarıyla seyahat edebileceklerdir.',
                        active: false,
                        id: 22
                    }, {
                        title: 'Ülkemizde turizm amacıyla bulunan yabancı turistler sokağa çıkma kısıtlamasına tabi midir?',
                        description: 'Turistik faaliyetler kapsamında geçici bir süreyle Ülkemizde bulunan yabancı turistler hafta sonları uygulanacak olan sokağa çıkma kısıtlamasından muaf tutulacaktır.',
                        active: false,
                        id: 23
                    }, {
                        title: 'Genelge kapsamında faaliyetlerine ara verilen halı sahalarda amatör spor kulüplerinin antrenmanları ile futbol akademisi çalışmaları yapılabilir mi?',
                        description: 'Amatör liglerin ertelenmiş durumda olması nedeniyle, yeni bir karar alınıncaya kadar faaliyetleri durdurulan halı sahalarda antrenman yapılamayacağı ve futbol okulu/akademisi gibi faaliyetlerin devam edemeyeceği değerlendirilmektedir.',
                        active: false,
                        id: 24
                    }
                ],
                kaynakca: "https://www.icisleri.gov.tr/koronavirus-salgini-yeni-tedbirler",
                mekanlar: [
                    {
                        mekan: ["Alışveriş Merkezi", "Market", "Berber", "Kuaför", "Güzellik Merkezi"],
                        acilis: 10,
                        kapanis: 20,
                        aciklama: "Normal Çalışıyor",
                        hepMiKapali: false,
                        icon: "running",
                        color: "info"
                    }, {
                        mekan: ["Restoran", "Lokanta", "Pastane", "Kafe", "Kafeterya"],
                        acilis: 10,
                        kapanis: 20,
                        aciklama: "Gel Al ve Paket Servis",
                        hepMiKapali: false,
                        icon: "car",
                        color: "warning"
                    }, {
                        mekan: ["Restoran", "Lokanta", "Pastane", "Kafe", "Kafeterya"],
                        acilis: 0,
                        kapanis: 24,
                        aciklama: "Online Sipariş",
                        hepMiKapali: false,
                        icon: "shopping-bag",
                        color: "success"
                    }, {
                        mekan: ["Sinema Salonu", "Kahvehane", "Kıraathane", "Kır Bahçesi", "İnternet Kafe", "Elektronik Oyun Salonları", "Bilardo Salonları", "Lokaller", "Çay Bahçesi", "Halı Sahalar", "Nargile Salonu"],
                        acilis: 4,
                        kapanis: 3,
                        aciklama: "Faaliyetleri Duruduruldu",
                        hepMiKapali: true,
                        icon: "ban",
                        color: "danger"
                    }
                ],
                kisiKisitlamalari: [
                    //yas 1 = 0<yas<20, yas 2 = 20<yas<65, yas 3 65<yas
                    {
                        yas: 1,
                        izinBaslangic: 13,
                        izinBitis: 16,
                        gun: [1, 2, 3, 4, 5, 6, 0],
                        aciklama: "01.01.2001 Sonrası Doğanlar. İşyerleri ile illiyetlerini gösteren çalışma/SGK kaydı vb. belgeyi ibraz eden çalışanlar hariç"
                    }, {
                        yas: 2,
                        izinBaslangic: 10,
                        izinBitis: 20,
                        gun: [6, 0],
                        aciklama: "Üretim, imalat ve tedarik zincirleri bu kısıtlamadan muaftır. "
                    }, {
                        yas: 2,
                        izinBaslangic: 5,
                        izinBitis: 5,
                        gun: [1],
                        aciklama: "Üretim, imalat ve tedarik zincirleri bu kısıtlamadan muaftır. "
                    }, {
                        yas: 3,
                        izinBaslangic: 10,
                        izinBitis: 13,
                        gun: [1, 2, 3, 4, 5, 6, 0],
                        aciklama: ""
                    }
                ]
            }
        },
        created() {
            this.haftaninBuGunu = new Date().getDay();
            this.interval = setInterval(() => {
                this.simdiCikabilirmi();
                this.evdeOlmakIcinGeriSayim();
                this.yasaginKalkmasiIcinGeriSayim();
            }, 1000);

            this.interval = setInterval(() => {
                this.mekanlarinDurumunuGetir();
            }, 60000);
        },
        mounted() {
            this.personalCreated = localStorage.getItem("selectedAge") !== null
            this.mekanlarinDurumunuGetir();
        },
        computed: {
            isPersonalCreatedComputed: function () {
                return this.personalCreated;
            },
            isAcikMekanlarRenderedComputed: function () {
                return this.acikMekanlar.length > 0;
            },
            isKapaliMekanlarRenderedComputed: function () {
                return this.kapaliMekanlar.length > 0;
            },
            isSimdiCikabilirComputed: function () {
                return this.isSimdiCikabilir;
            },
            evdeOlmakIcinKalanSureComputed: function () {
                return this.evdeOlmakIcinKalanSure;
            },
            yasaginKalmakmasiIcinKalanSureComputed: function () {
                return this.yasaginKalkmasiIcinKalanSure;
            },
            saatGosterimiClass: function () {
                if (this.yasaginKalkmaZamani>0){
                    if (parseInt(this.yasaginKalkmasiIcinKalanSure[0])===0){
                        return "saatGosterimiWarning";
                    }
                    return "saatGosterimiDanger";
                }else if (this.evdeOlmaZamani>0){
                    if (parseInt(this.evdeOlmakIcinKalanSure[0])===0){
                        return "saatGosterimiWarning";
                    }
                    return "saatGosterimiSuccess";
                }

                return "saatGosterimiSuccess";
            },
        },

        methods: {
            handleHomePage: function () {
            },
            clearPersonelData: function () {
                localStorage.removeItem("selectedAge");
            },
            yenidenYasSec: function () {
                this.personalCreated = false;
                this.istisnaModalShow = false;
            },
            savePersonalInfo: function () {
                localStorage.setItem("selectedAge", this.selectedAgeChoise);
                this.personalCreated = true;
            },
            getSelectedAge: function () {
                return localStorage.getItem("selectedAge");
            },
            getCurrentTime: function () {
                return new Date().getTime();
            },
            getTime: function (hour) {
                return new Date().setHours(hour, 0, 0);
            },
            mekanlarinDurumunuGetir() {
                this.acikMekanlar = [];
                this.kapaliMekanlar = [];
                let currentTime = this.getCurrentTime();
                for (var index in this.mekanlar) {
                    let mekan = this.mekanlar[index];
                    let acilis = this.getTime(mekan.acilis);
                    let kapanis = this.getTime(mekan.kapanis);

                    //kapali mekanlar
                    if (acilis > currentTime || kapanis < currentTime) {
                        this.kapaliMekanlar.push(mekan);
                    }
                    //acik mekanlar
                    else if (acilis < currentTime & kapanis > currentTime) {
                        this.acikMekanlar.push(mekan);
                    }
                }

            },
            yasaginKalkmasiIcinGeriSayim() {
                //burada seçim zorunluluğu olmalı. Seçime göre şu en erken ne zaman dışarı çıkabilir geri say
                let remainTime = this.yasaginKalkmaZamani - new Date().getTime();
                var hours = Math.floor((remainTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((remainTime % (1000 * 60)) / 1000);

                if (seconds === 60) {
                    seconds = 59;
                }

                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }

                this.yasaginKalkmasiIcinKalanSure = [hours, minutes, seconds];
            },
            evdeOlmakIcinGeriSayim() {
                //burada seçim zorunluluğu olmalı. Seçime göre içeri girmesi için ne kadar zamanı kaldı göster.
                let remainTime = this.evdeOlmaZamani - new Date().getTime();

                var hours = Math.floor((remainTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((remainTime % (1000 * 60)) / 1000);

                if (seconds === 60) {
                    seconds = 59;
                }

                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }

                this.evdeOlmakIcinKalanSure = [hours, minutes, seconds];
            },
            simdiCikabilirmi() {
                //burada seçim zorunluluğu olmalı. Seçime göre şu anki zaman diliminde dışarı çıkabilir mi kontrol et.
                let currentTime = this.getCurrentTime();
                let currentHour = new Date(currentTime).getHours();
                var selectedAge = this.getSelectedAge();

                for (let index in this.kisiKisitlamalari) {
                    let kisitlamaItem = this.kisiKisitlamalari[index];
                    let kisitlamaItemYas = kisitlamaItem.yas;

                    let kisitlamaItemGun = kisitlamaItem.gun; //array
                    //yaş kontrolü yapıldı.

                    if (kisitlamaItemYas == selectedAge) {
                        if (kisitlamaItemGun.indexOf(this.haftaninBuGunu) > -1) {
                            //gün kontrolü de yapılmalı. Haftanın hangi günü.
                            let bitisSaatiSonrakiGun = false;
                            if (currentHour > kisitlamaItem.izinBitis) {
                                bitisSaatiSonrakiGun = true;
                            }

                            let baslangicSaatiSonrakiGun = false;
                            if (currentHour > kisitlamaItem.izinBaslangic) {
                                baslangicSaatiSonrakiGun = true;
                            }

                            let izinBaslangic = this.getTime(kisitlamaItem.izinBaslangic);
                            let izinBitis = this.getTime(kisitlamaItem.izinBitis);

                            //yasak değil. Çıkabilir.
                            if (izinBaslangic < currentTime && currentTime < izinBitis) {
                                this.isSimdiCikabilir = true;

                                if (bitisSaatiSonrakiGun) {
                                    this.evdeOlmaZamani = izinBitis + 86400000;
                                } else {
                                    this.evdeOlmaZamani = izinBitis;
                                }

                                this.yasaginKalkmaZamani = 0;
                            } else {
                                //yasak. çıkamaz.
                                this.isSimdiCikabilir = false;

                                if (baslangicSaatiSonrakiGun) {
                                    this.yasaginKalkmaZamani = izinBaslangic + 86400000;
                                } else {
                                    this.yasaginKalkmaZamani = izinBaslangic;
                                }

                                this.evdeOlmaZamani = 0;
                            }
                        }
                    }
                }

            },
            haftalikDisariCikabilirmi() {
                //burada seçim zorunluluğu olmalı. Seçime göre önümüzdeki bir hafta boyunca hangi günler hangi saatlerde çıkabilir kontrol et.
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 10px;
    }

    .plusIcon:hover {
        box-shadow: 0 1.5rem 2rem rgba(0, 0, 0, 0.15) !important
    }

    .accordion-caret {
        background-image: linear-gradient(to top right, transparent 50%, #727272 50%);
        width: 0.5rem;
        height: 0.5rem;
        transform: rotate(-45deg);
    }

    html, body, #app {
        color: #727272;
        font-family: Montserrat, sans-serif;
        font-size: 14px;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    #app,
    .accordion,
    .accordion-item,
    .accordion-header,
    .accordion-body {
        font-family: inherit;
    }

    .accordion {
        background-color: #ffffff;
        width: 100%;
        max-height: 100%;
        padding: 2rem 1rem;
        margin: auto;
        box-sizing: border-box;
        overflow: auto;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
    }

    .accordion-item.accordion-active .accordion-caret {
        animation: accordion-is-active 200ms linear forwards;
    }

    .accordion-header {
        color: inherit;
        font-size: 1.2rem;
        font-weight: bold;
        position: relative;
    }

    .accordion-header a {
        color: inherit;
        text-decoration: none;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        border-radius: 0.6rem;
        transition: background-color 200ms ease-in-out;
    }

    .accordion-header a:not(.accordion-active):hover {
        background-color: #efefef;
    }

    .accordion-header-div {
        padding: 1rem 1rem 1rem 1rem;
    }

    .accordion-header-div:last-child {
        padding-left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .accordion-caret {
        background-image: linear-gradient(
                to top right,
                transparent 50%,
                #727272 50%
        );
        width: 0.5rem;
        height: 0.5rem;
        transform: rotate(-45deg);
        animation: accordion-is-inactive 200ms linear forwards;
    }

    .accordion-body {
        height: 0;
        overflow: hidden;
    }

    .accordion-content {
        padding: 1rem;
    }

    @keyframes accordion-is-inactive {
        0% {
            transform: rotate(-45deg);
        }
        50% {
            transform: scale(1.5) rotate(45deg);
        }
        100% {
            transform: rotate(135deg);
        }
    }

    @keyframes accordion-is-active {
        0% {
            transform: rotate(135deg);
        }
        50% {
            transform: scale(1.5) rotate(45deg);
        }
        100% {
            transform: rotate(-45deg);
        }
    }

    @media screen and (min-width: 320px) {
        .accordion {
            max-height: none;
            border-radius: 0.5rem;
        }
    }

    .saatGosterimi {
        padding: 5px;
        font-size: 24px;
        float: left;
        width: 50px;
        border-radius: 3px;
        font-weight: bold;
    }
    .saatGosterimiSuccess {
        background: darkgreen;
        color:white;
    }
    .saatGosterimiDanger {
        background: #d50303;
        color:white;
    }
    .saatGosterimiWarning {
        background: #caca00;
        color:black;
    }

</style>
