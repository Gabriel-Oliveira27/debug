// Base de dados de ramais
var ramais = [
    { setor: 'TI', nome: 'Suporte T.I', ramal: '221', observacao: 'Lívia' },
    { setor: 'TI', nome: 'Suporte T.I', ramal: '205', observacao: 'Gabriel' },
    { setor: 'TI', nome: 'Suporte T.I', ramal: '230', observacao: 'Pablo' },
    { setor: 'TI', nome: 'Suporte T.I', ramal: '318', observacao: 'Vinicius' },
    { setor: 'TI', nome: 'Suporte T.I', ramal: '302', observacao: 'Karol' },
    { setor: 'TI', nome: 'Suporte T.I', ramal: '295', observacao: 'Weslle' },
    { setor: 'TI', nome: 'Suporte T.I', ramal: '301', observacao: 'Enzio' },
    { setor: 'TI', nome: 'Suporte T.I', ramal: '208', observacao: 'Gustavo' },
    { setor: 'TI', nome: 'Infra', ramal: '286', observacao: 'Ewerton/Kauâ' },
    
];

// Elementos do DOM
var searchInput;
var setorFilter;
var ramaisTableBody;
var noResults;
var resultCounter;
var tableContainer;

// Estado da aplicação
var ramaisFiltrados = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initElements();
    initEventListeners();
    populateSetorFilter();
    renderRamais(ramais);
    updateCounter(ramais.length);
});

// Inicializar elementos
function initElements() {
    searchInput = document.getElementById('searchInput');
    setorFilter = document.getElementById('setorFilter');
    ramaisTableBody = document.getElementById('ramaisTableBody');
    noResults = document.getElementById('noResults');
    resultCounter = document.getElementById('resultCounter');
    tableContainer = document.querySelector('.table-container');
}

// Inicializar event listeners
function initEventListeners() {
    searchInput.addEventListener('input', handleFilter);
    setorFilter.addEventListener('change', handleFilter);
}

// Popular select de setores
function populateSetorFilter() {
    var setores = [];
    
    for (var i = 0; i < ramais.length; i++) {
        if (setores.indexOf(ramais[i].setor) === -1) {
            setores.push(ramais[i].setor);
        }
    }
    
    setores.sort();
    
    for (var j = 0; j < setores.length; j++) {
        var option = document.createElement('option');
        option.value = setores[j];
        option.textContent = setores[j];
        setorFilter.appendChild(option);
    }
}

// Filtrar ramais
function filterRamais() {
    var searchTerm = searchInput.value.toLowerCase().trim();
    var selectedSetor = setorFilter.value;
    
    var filtered = [];
    
    for (var i = 0; i < ramais.length; i++) {
        var ramal = ramais[i];
        var matchSearch = true;
        var matchSetor = true;
        
        if (searchTerm) {
            var searchableText = (
                ramal.nome.toLowerCase() + ' ' +
                ramal.setor.toLowerCase() + ' ' +
                ramal.ramal + ' ' +
                (ramal.observacao ? ramal.observacao.toLowerCase() : '')
            );
            matchSearch = searchableText.indexOf(searchTerm) !== -1;
        }
        
        if (selectedSetor) {
            matchSetor = ramal.setor === selectedSetor;
        }
        
        if (matchSearch && matchSetor) {
            filtered.push(ramal);
        }
    }
    
    return filtered;
}

// Handler de filtro
function handleFilter() {
    ramaisFiltrados = filterRamais();
    renderRamais(ramaisFiltrados);
    updateCounter(ramaisFiltrados.length);
}

// Renderizar ramais
function renderRamais(data) {
    ramaisTableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableContainer.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    tableContainer.style.display = 'block';
    noResults.style.display = 'none';
    
    for (var i = 0; i < data.length; i++) {
        var ramal = data[i];
        var row = createRamalRow(ramal);
        ramaisTableBody.appendChild(row);
    }
}

// Criar linha de ramal
function createRamalRow(ramal) {
    var tr = document.createElement('tr');
    
    var tdSetor = document.createElement('td');
    var setorBadge = document.createElement('span');
    setorBadge.className = 'setor-badge';
    setorBadge.textContent = ramal.setor;
    tdSetor.appendChild(setorBadge);
    
    var tdNome = document.createElement('td');
    tdNome.textContent = ramal.nome;
    
    var tdRamal = document.createElement('td');
    var ramalSpan = document.createElement('span');
    ramalSpan.className = 'ramal-destaque';
    ramalSpan.textContent = ramal.ramal;
    tdRamal.appendChild(ramalSpan);
    
    var tdObservacao = document.createElement('td');
    if (ramal.observacao) {
        var obsSpan = document.createElement('span');
        obsSpan.className = 'observacao-texto';
        obsSpan.textContent = ramal.observacao;
        tdObservacao.appendChild(obsSpan);
    } else {
        tdObservacao.textContent = '-';
    }
    
    tr.appendChild(tdSetor);
    tr.appendChild(tdNome);
    tr.appendChild(tdRamal);
    tr.appendChild(tdObservacao);
    
    return tr;
}

// Atualizar contador
function updateCounter(count) {
    resultCounter.innerHTML = 'Mostrando <strong>' + count + '</strong> rama' + (count === 1 ? 'l' : 'is');
}
